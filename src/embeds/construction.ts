import { EmbedBuilder } from "discord.js";
import { getRarityColor } from "../utils/format";

export function buildConstructionEmbed(ship: any): EmbedBuilder {
  const title = ship.names.en || ship.names.code;

  // Construction pools
  const availableIn = ship.construction?.availableIn;
  const pools = availableIn
    ? (
        [
          ["Light", availableIn.light],
          ["Heavy", availableIn.heavy],
          ["Aviation", availableIn.aviation],
          ["Limited", availableIn.limited],
          ["Exchange", availableIn.exchange],
        ] as [string, boolean][]
      )
        .filter(([, v]) => v)
        .map(([label]) => label)
        .join(", ")
    : "";
  const poolsDisplay = pools || "Not constructable";

  // Scrap value
  const scrap = ship.scrapValue;
  const scrapDisplay = scrap
    ? `💰 Coins: ${scrap.coin} | 🛢 Oil: ${scrap.oil} | 🏅 Medals: ${scrap.medal}`
    : "N/A";

  // Fleet tech points
  const techPoints = ship.fleetTech?.techPoints;
  const techDisplay = techPoints
    ? [
        `Collection: ${techPoints.collection}`,
        `MLB: ${techPoints.maxLimitBreak}`,
        `Max Level: ${techPoints.maxLevel}`,
        `Total: ${techPoints.total}`,
      ].join(" | ")
    : "N/A";

  // Map drops
  const mapDrops =
    ship.obtainedFrom?.fromMaps?.length > 0
      ? ship.obtainedFrom.fromMaps.join(", ")
      : "None";

  // Retrofit
  const retrofitDisplay = ship.retrofit
    ? ship.retrofitHullType
      ? `Available (→ ${ship.retrofitHullType})`
      : "Available"
    : "Not available";

  const embed = new EmbedBuilder()
    .setTitle(`${title} — Construction & Acquisition`)
    .setColor(getRarityColor(ship.rarity))
    .setThumbnail(ship.thumbnail)
    .addFields(
      {
        name: "Construction Time",
        value: ship.construction?.constructionTime || "N/A",
        inline: true,
      },
      {
        name: "Available In",
        value: poolsDisplay,
        inline: true,
      },
      {
        name: "Other Sources",
        value: ship.obtainedFrom?.obtainedFrom || "N/A",
      },
      {
        name: "Map Drops",
        value: mapDrops,
      },
      {
        name: "Scrap Value",
        value: scrapDisplay,
      },
      {
        name: "Fleet Tech Points",
        value: techDisplay,
      },
    );

  // Conditional bonus fields
  const collection = ship.fleetTech?.statsBonus?.collection;
  if (collection) {
    embed.addFields({
      name: "Collection Bonus",
      value: `${collection.stat} +${collection.bonus} for ${collection.applicable.join(", ")}`,
    });
  }

  const maxLevel = ship.fleetTech?.statsBonus?.maxLevel;
  if (maxLevel) {
    embed.addFields({
      name: "Max Level Bonus",
      value: `${maxLevel.stat} +${maxLevel.bonus} for ${maxLevel.applicable.join(", ")}`,
    });
  }

  embed.addFields({
    name: "Retrofit",
    value: retrofitDisplay,
  });

  embed.setFooter({ text: "Page 4/5 • Construction" });

  return embed;
}
