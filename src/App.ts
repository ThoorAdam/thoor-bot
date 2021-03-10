import { Client, Message, MessageEmbed, TextChannel } from 'discord.js';
import { config as initEnv } from 'dotenv';
import express from 'express';

import { commands } from './commands';
import { AppConfig } from './config';
import { Environment, Events, HttpStatus } from './enums';
import { logger, env, startsWith } from './helpers';

export class App {
    client = new Client();
    api = express();
    deploymentChannel!: TextChannel;

    constructor() {
        initEnv();
    }

    async init() {
        this.client.on(Events.Ready, () => {
            logger.info('Client', `Signed in as ${this.client.user?.tag}`);

            this.initChannels();
            this.listenToMessages();
        });

        const port = env.asNumber(Environment.Port) || 5555;

        this.api.use(express.json());
        this.initApiRoutes();

        this.api.listen(port, '0.0.0.0', () => {
            logger.info('API', `API running on http://localhost:${port}`);

            this.loginBot();
        });
    }

    private listenToMessages() {
        this.client.on(Events.Message, (message: Message) => {
            const { content } = message;

            if (!message.author.bot && startsWith(AppConfig.commandPrefix, content)) {
                const parts = content.split(' ');
                const commandName = parts[0].substr(1);
                const args = parts.slice(1, parts.length);

                for (const command of commands) {
                    if (command.keys.find((key) => key === commandName)) {
                        command.execute(message, args);

                        break;
                    }
                }
            }
        });
    }

    private initChannels() {
        const deploymentChannel = this.client.channels.cache.get('819223925010858024');

        if (deploymentChannel) {
            this.deploymentChannel = deploymentChannel as TextChannel;
        }
    }

    private loginBot() {
        this.client.login(env.asString(Environment.DiscordToken));
    }

    private initApiRoutes() {
        this.api.post('/deploy', (req, res) => {
            const { type, project, environment, message } = req.body;
            const acceptedTypes = ['start', 'abort', 'complete'];

            if (!type || !project || !environment) {
                return res.status(HttpStatus.BadRequest).send({
                    status: HttpStatus.BadRequest,
                    message: 'Missing parameter(s) "type", "project" or "environment".',
                });
            }

            if (!acceptedTypes.find((t) => t === type)) {
                return res.status(HttpStatus.BadRequest).send({
                    status: HttpStatus.BadRequest,
                    message: `Unknown type, available types: "${acceptedTypes.join(', ')}"`,
                });
            }

            this.sendDeployMessage(type, project, environment, message);

            res.status(HttpStatus.Created).send({
                status: HttpStatus.Created,
                message: 'Message sent.',
            });
        });
    }

    private sendDeployMessage(type: string, project: string, environment: string, message: string) {
        const embed = new MessageEmbed().setColor('#2eba9c').setTitle('Deploy started');

        embed.addField('Project', project);
        embed.addField('Environment', environment);

        if (message) {
            embed.addField('Message', message);
        }

        if (this.deploymentChannel) {
            this.deploymentChannel.send(embed);
        }
    }
}

new App().init();
