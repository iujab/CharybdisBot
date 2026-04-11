import { EmbedBuilder } from "discord.js";
import { getRarityColor, truncate } from "../utils/format";

const SKILL_COLOR_EMOJIS: Record<string, string> = {
  red: "\uD83D\uDD34",
  yellow: "\uD83D\uDFE1",
  blue: "\uD83D\uDD35",
};

function getSkillEmoji(color: string): string {
  return SKILL_COLOR_EMOJIS[color.toLowerCase()] ?? "\u26AA";
}

function formatLimitBreaks(limitBreaks?: string[][]): string {
  if (!limitBreaks || limitBreaks.length === 0) return "N/A";

  return limitBreaks
    .map((bonuses, i) => `**LB${i + 1}:** ${bonuses.join(" / ")}`)
    .join("\n");
}

export function buildSkillsEmbed(ship: any): EmbedBuilder {
  const title = ship.names.en || ship.names.code;

  const embed = new EmbedBuilder()
    .setTitle(`${title} — Skills`)
    .setColor(getRarityColor(ship.rarity))
    .setThumbnail(ship.thumbnail);

  for (const skill of ship.skills) {
    embed.addFields({
      name: `${getSkillEmoji(skill.color)} ${skill.names.en}`,
      value: truncate(skill.description, 1024),
      inline: false,
    });
  }

  embed.addFields({
    name: "Limit Breaks",
    value: formatLimitBreaks(ship.limitBreaks),
    inline: false,
  });

  embed.setFooter({ text: "Page 3/5 \u2022 Skills" });

  return embed;
}
