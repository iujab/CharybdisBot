import {
  ActionRowBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
} from "discord.js";

export function createSkinSelect(
  ship: any,
  currentSkin: number
): ActionRowBuilder<StringSelectMenuBuilder> {
  const options = ship.skins.map((skin: any, i: number) =>
    new StringSelectMenuOptionBuilder()
      .setLabel(skin.name)
      .setValue(String(i))
      .setDefault(i === currentSkin)
  );

  return new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
    new StringSelectMenuBuilder()
      .setCustomId("skin_select")
      .setPlaceholder("Select a skin")
      .addOptions(options)
  );
}
