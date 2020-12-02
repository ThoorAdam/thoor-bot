import { Message } from 'discord.js';

export interface Command {
    keys: string[];
    description: string;
    execute: (message: Message, args: string[]) => Promise<Message> | void;
}
