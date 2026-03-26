import { EmbedBuilder } from "discord.js";
import { getRarityColor, formatStars } from "../utils/format";

export function buildOverviewEmbed(ship: any): EmbedBuilder {
  const title = ship.names.en || ship.names.code;

  const names = [
    ship.names.en ? `EN: ${ship.names.en}` : null,
    ship.names.jp ? `JP: ${ship.names.jp}` : null,
    ship.names.cn ? `CN: ${ship.names.cn}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  return new EmbedBuilder()
    .setTitle(title)
    .setColor(getRarityColor(ship.rarity))
    .setThumbnail(ship.thumbnail)
    .setURL(ship.wikiUrl)
    .addFields(
      { name: "Names", value: names || "Unknown", inline: true },
      { name: "Class", value: ship.class || "Unknown", inline: true },
      { name: "Hull Type", value: ship.hullType || "Unknown", inline: true },
      { name: "Nationality", value: ship.nationality || "Unknown", inline: true },
      {
        name: "Rarity",
        value: `${ship.rarity} ${formatStars(ship.stars)}`,
        inline: true,
      },
      { name: "ID", value: ship.id || "Unknown", inline: true },
      {
        name: "Artist",
        value: ship.misc?.artist?.name || "Unknown",
        inline: true,
      },
      {
        name: "Voice",
        value: ship.misc?.voice?.name || "Unknown",
        inline: true,
      },
    )
    .setFooter({ text: "Page 1/5 \u2022 Overview" });
}
