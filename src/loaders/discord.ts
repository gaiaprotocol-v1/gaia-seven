import { Client, Collection, Intents } from "discord.js";
import { Container } from 'typedi'
import DiscordService from "../services/discord";
import { logger } from '../config/winston';

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const currency = new Collection();
const discordServiceInstance = Container.get(DiscordService);

client.once('ready', () => {
    discordServiceInstance.setCommand();
    discordServiceInstance.createGenesis();
    logger.info(`Logged in as ${client.user?.tag}`);
});

client.on('messageCreate', async message => {
    if (message.author.bot) return;
    // currency.add(message.author.id, 1);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    switch (commandName) {
        case "링크트리":
            discordServiceInstance.getLinkTree(interaction);
            break;
    }
});

client.login(process.env.DISCORD_TOKEN);