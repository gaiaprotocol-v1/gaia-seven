import { Client, Intents } from "discord.js";
import { Container } from 'typedi'
import { logger } from '../config/winston';
import CommonService from "../services/common";
import OpenseaService from "../services/opensea";
import TokenService from "../services/token";

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const commonServiceInstance = Container.get(CommonService);
const tokenServiceInstance = Container.get(TokenService);
const openseaServiceInstance = Container.get(OpenseaService);

client.once('ready', async () => {
    const kronos = await openseaServiceInstance.getCollectionFP("gaia-kronos");
    const supernova = await openseaServiceInstance.getCollectionFP("gaia-supernova");
    client.user?.setActivity(`🗿 ${kronos} | 👺 ${supernova}`, ({ type: "PLAYING" }));
    commonServiceInstance.setCommand();
    commonServiceInstance.createGenesis();
    logger.info(`Logged in as ${client.user?.tag}`);
});

client.on('messageCreate', async message => {
    if (message.author.bot) return;
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    switch (commandName) {
        case "링크":
            commonServiceInstance.getLinkTree(interaction);
            break;
    }
});

client.login(process.env.DISCORD_TOKEN);