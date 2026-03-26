import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";

export function createSkinButtons(
  currentSkin: number,
  totalSkins: number
): ActionRowBuilder<ButtonBuilder> {
  return new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setCustomId("skin_prev")
      .setEmoji("\u25C0")
      .setStyle(ButtonStyle.Secondary)
      .setDisabled(currentSkin === 0),
    new ButtonBuilder()
      .setCustomId("skin_indicator")
      .setLabel(`Skin ${currentSkin + 1}/${totalSkins}`)
      .setStyle(ButtonStyle.Primary)
      .setDisabled(true),
    new ButtonBuilder()
      .setCustomId("skin_next")
      .setEmoji("\u25B6")
      .setStyle(ButtonStyle.Secondary)
      .setDisabled(currentSkin === totalSkins - 1),
    new ButtonBuilder()
      .setCustomId("skin_back")
      .setEmoji("\uD83D\uDD19")
      .setLabel("Back to Info")
      .setStyle(ButtonStyle.Danger)
  );
}
