import { Client, Events, GatewayIntentBits } from 'discord.js';
import { AzurData as AzurAPI } from 'azurdata';
import * as dotenv from 'dotenv';
import * as shipCommand from './commands/ship';

dotenv.config();

const token = process.env.DISCORD_TOKEN;
if (!token) {
  console.error('Missing DISCORD_TOKEN in .env file');
  process.exit(1);
}

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

const azurapi = new AzurAPI();

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Logged in as ${readyClient.user.tag}`);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === shipCommand.data.name) {
    try {
      await shipCommand.execute(interaction, azurapi);
    } catch (error) {
      console.error('Error executing /ship command:', error);
      const content = 'Something went wrong while looking up that ship.';
      if (interaction.deferred || interaction.replied) {
        await interaction.editReply({ content }).catch(() => {});
      } else {
        await interaction.reply({ content, ephemeral: true }).catch(() => {});
      }
    }
  }
});

client.login(token);
