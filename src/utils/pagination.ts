import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";

export const PAGE_NAMES: string[] = [
  "Overview",
  "Stats",
  "Skills",
  "Construction",
  "Skins",
];

export function createPageButtons(
  currentPage: number,
  totalPages: number
): ActionRowBuilder<ButtonBuilder> {
  return new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setCustomId("page_prev")
      .setEmoji("\u25C0")
      .setStyle(ButtonStyle.Secondary)
      .setDisabled(currentPage === 0),
    new ButtonBuilder()
      .setCustomId("page_indicator")
      .setLabel(`Page ${currentPage + 1}/${totalPages}`)
      .setStyle(ButtonStyle.Primary)
      .setDisabled(true),
    new ButtonBuilder()
      .setCustomId("page_next")
      .setEmoji("\u25B6")
      .setStyle(ButtonStyle.Secondary)
      .setDisabled(currentPage === totalPages - 1)
  );
}

export function createPageSelectRow(
  currentPage: number
): ActionRowBuilder<ButtonBuilder> {
  return new ActionRowBuilder<ButtonBuilder>().addComponents(
    PAGE_NAMES.map((name, i) =>
      new ButtonBuilder()
        .setCustomId(`tab_${i}`)
        .setLabel(name)
        .setStyle(
          i === currentPage ? ButtonStyle.Primary : ButtonStyle.Secondary
        )
    )
  );
}
