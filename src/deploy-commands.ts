import { REST, Routes } from 'discord.js';
import * as dotenv from 'dotenv';
import * as shipCommand from './commands/ship';

dotenv.config();

const token = process.env.DISCORD_TOKEN;
const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;

if (!token || !clientId) {
  console.error('Missing DISCORD_TOKEN or CLIENT_ID in .env file');
  process.exit(1);
}

const commands = [shipCommand.data.toJSON()];

const rest = new REST().setToken(token);

(async () => {
  try {
    console.log(`Registering ${commands.length} slash command(s)...`);

    if (guildId) {
      // Guild-specific (instant, good for development)
      await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
        body: commands,
      });
      console.log(`Commands registered to guild ${guildId}`);
    } else {
      // Global (can take up to 1 hour to propagate)
      await rest.put(Routes.applicationCommands(clientId), {
        body: commands,
      });
      console.log('Commands registered globally');
    }
  } catch (error) {
    console.error('Failed to register commands:', error);
  }
})();
