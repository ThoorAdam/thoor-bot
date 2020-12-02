import { Command } from '../interfaces';
import { HelpCommand } from './Help';
import { PingCommand } from './Ping';
import { WowheadCommand } from './Wowhead';

export const commands: Command[] = [new PingCommand(), new WowheadCommand(), new HelpCommand()];
