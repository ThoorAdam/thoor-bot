import { Client, Message } from 'discord.js';
import { config as initEnv } from 'dotenv';

import { commands } from './commands';
import { AppConfig } from './config';
import { Environment, Events } from './enums';
import { logger, env, startsWith } from './helpers';

export class App {
    client = new Client();

    constructor() {
        initEnv();
    }

    init() {
        this.client.on(Events.Ready, () => logger.info('Client', `Signed in as ${this.client.user?.tag}`));

        this.listenToMessages();

        this.client.login(env.asString(Environment.DiscordToken));
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
}

new App().init();
