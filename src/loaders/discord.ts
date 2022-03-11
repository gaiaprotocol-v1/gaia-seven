import { Client, Intents, Collection } from "discord.js";
import { Container } from 'typedi'
import { logger } from '../config/winston';
import BinanceService from "../services/binance";
import CommonService from "../services/common";
import TokenService from "../services/token";

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const commonServiceInstance = Container.get(CommonService);
const tokenServiceInstance = Container.get(TokenService);
const binanceServiceInstance = Container.get(BinanceService);

client.once('ready', () => {
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
        case "내정보":
            // tokenServiceInstance.getBalance(interaction);
            break;
        case "가격":
            binanceServiceInstance.getCandles("ETHBTC");
            break;
    }
});

client.login(process.env.DISCORD_TOKEN);