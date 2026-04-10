import { Emojis } from "./emojis";

type Rarity =
  | "Normal"
  | "Rare"
  | "Elite"
  | "Super Rare"
  | "Ultra Rare"
  | "Priority"
  | "Decisive";

export const RARITY_COLORS: Record<Rarity, number> = {
  Normal: 0x808080,
  Rare: 0x3b82f6,
  Elite: 0x8b5cf6,
  "Super Rare": 0xf59e0b,
  "Ultra Rare": 0xef4444,
  Priority: 0xf59e0b,
  Decisive: 0xef4444,
};

export function getRarityColor(rarity: string): number {
  return RARITY_COLORS[rarity as Rarity] ?? 0x808080;
}

export function rarityEmoji(rarity: string): string {
  switch (rarity) {
    case "Normal":     return Emojis.rarityNormal;
    case "Rare":       return Emojis.rarityRare;
    case "Elite":      return Emojis.rarityElite;
    case "Super Rare": return Emojis.raritySuperRare;
    case "Ultra Rare": return Emojis.rarityUltraRare;
    case "Priority":   return Emojis.rarityPriority;
    case "Decisive":   return Emojis.rarityDecisive;
    default:           return "";
  }
}

export function formatStars(stars: { stars: string; value: number }): string {
  const filled = stars.value;
  const empty = 6 - filled;
  return "\u2605".repeat(filled) + "\u2606".repeat(empty);
}

export function formatStat(value: string | number | undefined): string {
  return value !== undefined && value !== null ? String(value) : "N/A";
}

export function formatStatBlock(stats: any): string {
  return [
    `${Emojis.hp} ${formatStat(stats.health)}`,
    `${Emojis.firepower} ${formatStat(stats.firepower)}`,
    `${Emojis.torpedo} ${formatStat(stats.torpedo)}`,
    `${Emojis.aviation} ${formatStat(stats.aviation)}`,
    `${Emojis.antiAir} ${formatStat(stats.antiwar)}`,
    `${Emojis.reload} ${formatStat(stats.reload)}`,
    `${Emojis.evasion} ${formatStat(stats.evasion)}`,
    `${Emojis.speed} ${formatStat(stats.speed)}`,
    `${Emojis.accuracy} ${formatStat(stats.accuracy)}`,
    `${Emojis.luck} ${formatStat(stats.luck)}`,
  ].join("\n");
}

export function formatSlots(slots: any[]): string {
  return slots
    .map((slot, i) => {
      const eff = `${slot.minEfficiency}% / ${slot.maxEfficiency}%`;
      return `${i + 1}. ${slot.type} (${eff})`;
    })
    .join("\n");
}

export function truncate(str: string, max: number): string {
  if (str.length <= max) return str;
  return str.slice(0, max - 1) + "\u2026";
}
