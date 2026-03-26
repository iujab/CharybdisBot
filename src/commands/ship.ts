import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  ComponentType,
  InteractionResponse,
  Message,
} from 'discord.js';
import { AzurAPI } from '@azurapi/azurapi';
import { buildOverviewEmbed } from '../embeds/overview';
import { buildStatsEmbed } from '../embeds/stats';
import { buildSkillsEmbed } from '../embeds/skills';
import { buildConstructionEmbed } from '../embeds/construction';
import { buildSkinEmbed, getSkinCount } from '../embeds/skins';
import { createPageSelectRow } from '../utils/pagination';
import { createSkinButtons } from '../utils/carousel';

const TIMEOUT_MS = 5 * 60 * 1000; // 5 minutes

export const data = new SlashCommandBuilder()
  .setName('ship')
  .setDescription('Look up an Azur Lane ship by name')
  .addStringOption((option) =>
    option
      .setName('name')
      .setDescription('Ship name (any language) or ID')
      .setRequired(true)
  );

function getPageEmbed(ship: any, page: number, skinIndex: number) {
  switch (page) {
    case 0:
      return buildOverviewEmbed(ship);
    case 1:
      return buildStatsEmbed(ship);
    case 2:
      return buildSkillsEmbed(ship);
    case 3:
      return buildConstructionEmbed(ship);
    case 4:
      return buildSkinEmbed(ship, skinIndex);
    default:
      return buildOverviewEmbed(ship);
  }
}

function getComponents(page: number, skinIndex: number, totalSkins: number) {
  const rows = [createPageSelectRow(page)];
  if (page === 4) {
    rows.push(createSkinButtons(skinIndex, totalSkins));
  }
  return rows;
}

export async function execute(
  interaction: ChatInputCommandInteraction,
  azurapi: AzurAPI
) {
  const query = interaction.options.getString('name', true);

  await interaction.deferReply();

  let ship: any;
  try {
    const result = azurapi.ships.get(query);
    if (Array.isArray(result)) {
      ship = result[0];
    } else {
      ship = result;
    }
  } catch {
    ship = null;
  }

  if (!ship) {
    await interaction.editReply({
      content: `No ship found matching **${query}**. Try using the full English name or ship ID.`,
    });
    return;
  }

  let currentPage = 0;
  let currentSkin = 0;
  const totalSkins = getSkinCount(ship);

  const embed = getPageEmbed(ship, currentPage, currentSkin);
  const components = getComponents(currentPage, currentSkin, totalSkins);

  const reply = await interaction.editReply({
    embeds: [embed],
    components,
  });

  const message =
    reply instanceof Message
      ? reply
      : await interaction.fetchReply();

  const collector = message.createMessageComponentCollector({
    componentType: ComponentType.Button,
    time: TIMEOUT_MS,
    filter: (i) => i.user.id === interaction.user.id,
  });

  collector.on('collect', async (i) => {
    const id = i.customId;

    // Tab buttons (direct page jump)
    if (id.startsWith('tab_')) {
      const tabIndex = parseInt(id.split('_')[1], 10);
      if (!isNaN(tabIndex) && tabIndex >= 0 && tabIndex <= 4) {
        currentPage = tabIndex;
        if (currentPage !== 4) {
          currentSkin = 0; // reset skin index when leaving skins page
        }
      }
    }

    // Skin carousel buttons
    if (id === 'skin_prev' && currentSkin > 0) {
      currentSkin--;
    } else if (id === 'skin_next' && currentSkin < totalSkins - 1) {
      currentSkin++;
    } else if (id === 'skin_back') {
      currentPage = 0; // go back to overview
    }

    const newEmbed = getPageEmbed(ship, currentPage, currentSkin);
    const newComponents = getComponents(currentPage, currentSkin, totalSkins);

    await i.update({
      embeds: [newEmbed],
      components: newComponents,
    });
  });

  collector.on('end', async () => {
    try {
      const disabledComponents = getComponents(
        currentPage,
        currentSkin,
        totalSkins
      ).map((row) => {
        const newRow = new (row.constructor as any)();
        newRow.addComponents(
          row.components.map((c: any) => {
            const builder = new (c.constructor as any)(c.data);
            builder.setDisabled(true);
            return builder;
          })
        );
        return newRow;
      });

      await interaction.editReply({ components: disabledComponents });
    } catch {
      // interaction may have been deleted
    }
  });
}
