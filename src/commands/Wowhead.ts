import { tap, map } from 'rxjs/operators';
import { Message, MessageEmbed } from 'discord.js';

import { HttpService } from '../services';
import { Command } from '../interfaces';

export class WowheadCommand implements Command {
    keys = ['wowhead', 'w'];
    description = 'Wowhead search command. Usage: "!wowhead Thunderfury".';

    httpService = new HttpService();

    constructor() {}

    execute(message: Message, args: string[]) {
        const searchTerm = args.join(' ');

        this.searchWowhead(searchTerm)
            .pipe(
                tap((data) => {
                    message.channel.send(this.buildEmbed(data, searchTerm));
                })
            )
            .subscribe();
    }

    private buildEmbed(data: any, searchTerm: string): MessageEmbed {
        const embed = new MessageEmbed().setColor('#0099ff').setTitle(`Search results for: ${searchTerm}`);

        data.results.map((item: any) =>
            embed.addField(`${item.typeName}: ${item.name}`, `https://wowhead.com/${item.typeName.toLowerCase()}=${item.id}`)
        );

        return embed;
    }

    private searchWowhead(searchTerm: string) {
        return this.httpService
            .get(`https://www.wowhead.com/search/suggestions-template`)
            .parameters({
                q: searchTerm,
            })
            .execute()
            .pipe(
                map((result) => {
                    return result.data;
                })
            );
    }
}
