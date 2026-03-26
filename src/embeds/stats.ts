import { EmbedBuilder } from "discord.js";
import {
  getRarityColor,
  formatStatBlock,
  formatSlots,
  formatStat,
} from "../utils/format";

export function buildStatsEmbed(ship: any): EmbedBuilder {
  const title = `${ship.names.en || ship.names.code} — Stats`;

  const embed = new EmbedBuilder()
    .setTitle(title)
    .setColor(getRarityColor(ship.rarity))
    .setThumbnail(ship.thumbnail)
    .addFields(
      { name: "Level 100 Stats", value: formatStatBlock(ship.stats.level100) },
      { name: "Level 120 Stats", value: formatStatBlock(ship.stats.level120) },
    );

  if (ship.stats.level100Retrofit) {
    embed.addFields({
      name: "Level 120 Retrofit Stats",
      value: formatStatBlock(ship.stats.level120Retrofit),
    });
  }

  const ev = ship.enhanceValue;
  const enhanceLines = [
    `FP: ${formatStat(ev.firepower)}`,
    `TRP: ${formatStat(ev.torpedo)}`,
    `AVI: ${formatStat(ev.aviation)}`,
    `RLD: ${formatStat(ev.reload)}`,
  ].join(" / ");

  embed
    .addFields(
      { name: "Equipment Slots", value: formatSlots(ship.slots) },
      { name: "Enhance Value", value: enhanceLines },
    )
    .setFooter({ text: "Page 2/5 \u2022 Stats" });

  return embed;
}
