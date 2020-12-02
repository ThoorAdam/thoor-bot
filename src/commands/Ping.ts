import { Message } from 'discord.js';

import { Command } from '../interfaces';

// export const ping: Command = {
//     keys: ['ping'],
//     description: 'Ping pong test command.',
//     execute: (message) => message.reply('Pong!'),
// };

export class PingCommand implements Command {
    keys = ['ping'];
    description = 'Ping pong test command.';

    constructor() {}

    execute(message: Message) {
        message.reply('Pong!');
    }
}
