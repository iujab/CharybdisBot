import { EmbedBuilder } from "discord.js";
import { getRarityColor } from "../utils/format";
import { Emojis } from "../utils/emojis";

export function buildSkinEmbed(ship: any, skinIndex: number): EmbedBuilder {
  const skin = ship.skins[skinIndex];
  const title = `${ship.names.en || ship.names.code} — ${skin.name}`;

  const fields = [
    {
      name: "Cost",
      value: skin.info.cost ? `${skin.info.cost} ${Emojis.gem}` : "Free / Default",
      inline: true,
    },
    {
      name: "Obtained From",
      value: skin.info.obtainedFrom || "Default",
      inline: true,
    },
    {
      name: "Live2D",
      value: skin.info.live2dModel ? "Yes ✨" : "No",
      inline: true,
    },
  ];

  if (skin.info.enClient) {
    fields.push({
      name: "EN Client",
      value: skin.info.enClient,
      inline: true,
    });
  }

  return new EmbedBuilder()
    .setTitle(title)
    .setColor(getRarityColor(ship.rarity))
    .setImage(skin.image)
    .addFields(...fields)
    .setFooter({
      text: `Skin ${skinIndex + 1}/${ship.skins.length} • Page 5/5 • Skins`,
    });
}

export function getSkinCount(ship: any): number {
  return ship.skins?.length || 0;
}
