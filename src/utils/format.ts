type Rarity =
  | "Normal"
  | "Rare"
  | "Epic"
  | "Super Rare"
  | "Ultra Rare"
  | "Priority"
  | "Decisive";

export const RARITY_COLORS: Record<Rarity, number> = {
  Normal: 0x808080,
  Rare: 0x3b82f6,
  Epic: 0x8b5cf6,
  "Super Rare": 0xf59e0b,
  "Ultra Rare": 0xef4444,
  Priority: 0xf59e0b,
  Decisive: 0xef4444,
};

export function getRarityColor(rarity: string): number {
  return RARITY_COLORS[rarity as Rarity] ?? 0x808080;
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
  const lines = [
    [`HP: ${formatStat(stats.health)}`, `FP: ${formatStat(stats.firepower)}`],
    [`TRP: ${formatStat(stats.torpedo)}`, `EVA: ${formatStat(stats.evasion)}`],
    [`AA: ${formatStat(stats.antiwar)}`, `AVI: ${formatStat(stats.aviation)}`],
    [`RLD: ${formatStat(stats.reload)}`, `SPD: ${formatStat(stats.speed)}`],
    [`LCK: ${formatStat(stats.luck)}`, `ACC: ${formatStat(stats.accuracy)}`],
  ];
  return lines.map(([l, r]) => `${l.padEnd(14)}${r}`).join("\n");
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
