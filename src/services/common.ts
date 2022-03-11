import { Service } from 'typedi';
import { CommandInteraction, MessageEmbed } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { logger } from '../config/winston';

@Service()
export default class CommonService {
    async createGenesis(): Promise<void> {
    }

    async getLinkTree(interaction: CommandInteraction): Promise<void> {
        try {
            const embed = new MessageEmbed()
                .setColor("#B19C76")
                .setTitle("가이아 프로토콜 링크")
                .setURL("https://linktr.ee/gaia_protocol")
                .setThumbnail("https://res.cloudinary.com/drznekqaq/image/upload/v1646322200/Gaia/gaiaprotocol_alfo2k.png")
                .setDescription("가이아 프로토콜 URL입니다.")
                .addFields(
                    { name: "Gaia Protocol", value: "[Twitter](<https://twitter.com/gaia_protocol>)", inline: true },
                    { name: "Gaia Protocol", value: "[Discord](<https://discord.com/invite/gaia>)", inline: true },
                    { name: "Gaia Kronos", value: "[Docs](<https://docs.gaiakronos.com/kr/>)", inline: true },
                    { name: "Gaia Kronos", value: "[Web](<https://gaiakronos.com/>)", inline: true },
                )
                .setTimestamp()
                .setFooter({ text: "with gaia protocol" });
            await interaction.reply({ embeds: [embed], ephemeral: true });
            logger.info("getLinkTree")
        } catch (err) {
            logger.error(err);
        }
    }

    async setCommand(): Promise<void> {
        const commands = [
            new SlashCommandBuilder().setName('링크').setDescription('가이아 프로토콜 URL을 전달합니다.'),
            new SlashCommandBuilder().setName('내정보').setDescription('나의 정보를 전달합니다.'),
            new SlashCommandBuilder().setName('가격').setDescription('해당 코인 가격을 전달합니다.'),
        ]
            .map(command => command.toJSON());

        const rest = new REST({ version: '9' }).setToken(`${process.env.DISCORD_TOKEN}`);

        rest.put(Routes.applicationGuildCommands(`${process.env.DISCORD_CLIENT_ID}`, `${process.env.DISCORD_GUILD_ID}`), { body: commands })
            .then(() => console.log('Successfully registered application commands.'))
            .catch((err) => {
                logger.error(err)
            });
    }
}
