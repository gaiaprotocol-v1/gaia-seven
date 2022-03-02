import { Message } from 'discord.js';
import { Service } from 'typedi';
import { SlashCommandBuilder } from '@discordjs/builders';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';

@Service()
export default class DiscordService {
    async createGenesis() {

    }

    async getLinkTree(interaction: any) {
        await interaction.reply({ content: 'https://linktr.ee/gaia_protocol', ephemeral: true });
    }

    async setCommand() {
        const commands = [
            new SlashCommandBuilder().setName('링크트리').setDescription('가이아 프로토콜 URL을 전달합니다.'),
        ]
            .map(command => command.toJSON());

        const rest = new REST({ version: '9' }).setToken(`${process.env.DISCORD_TOKEN}`);

        rest.put(Routes.applicationGuildCommands(`${process.env.DISCORD_CLIENT_ID}`, `${process.env.DISCORD_GUILD_ID}`), { body: commands })
            .then(() => console.log('Successfully registered application commands.'))
            .catch(console.error);
    }
}
