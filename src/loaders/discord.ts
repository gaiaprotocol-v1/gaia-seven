import { Client, Intents } from "discord.js";
import { Container } from 'typedi'
import DiscordService from "../services/discord";

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const discordServiceInstance = Container.get(DiscordService);

client.once('ready', () => {
    discordServiceInstance.setCommand();
    discordServiceInstance.createGenesis();
    console.log(`Logged in as ${client.user?.tag}`);
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