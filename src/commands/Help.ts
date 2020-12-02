import { Message, MessageEmbed } from 'discord.js';

import { commands } from './index';
import { Command } from '../interfaces';

export class HelpCommand implements Command {
    keys = ['help'];
    description = 'This command.';

    constructor() {}

    execute(message: Message) {
        message.channel.send(this.buildEmbed());
    }

    private buildEmbed(): MessageEmbed {
        const embed = new MessageEmbed().setColor('#0099ff').setTitle('Available commands for ThunderBot');

        commands.map((command) => {
            const keys = command.keys.map((key) => (key = `!${key}`));

            embed.addField(keys.join(', '), command.description);
        });

        return embed;
    }
}
