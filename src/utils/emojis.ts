// Application emojis uploaded to the Discord dev portal.
// These render in any server the bot is in without USE_EXTERNAL_EMOJIS.
// Format: <:name:id> — Discord resolves by ID, name is cosmetic.
export const Emojis = {
  hp:          "<:30pxDuration:1492293487452750116>",
  firepower:   "<:39pxFirepower:1492293487146700921>",
  torpedo:     "<:25pxTorpedo:1492293486345719828>",
  aviation:    "<:29pxAviation:1492293485393481950>",
  antiAir:     "<:30pxAntiAir:1492293483996909800>",
  reload:      "<:26pxRefill:1492293476166139984>",
  evasion:     "<:26pxEvasion:1492293474974699621>",
  armor:       "<:20pxArmor:1492293472869286059>",
  speed:       "<:25pxSpeed:1492293472193871972>",
  accuracy:    "<:25pxHit:1492293471153815633>",
  luck:        "<:24pxLuck:1492293470256238853>",
  asw:         "<:30pxASW:1492293468918120458>",
  consumption: "<:26pxConsumption:1492293468037451918>",

  // Resources
  cube:        "<:23pxWisdom_Cube:1492296438313521242>",
  medal:       "<:18pxMedalicon:1492296437315141712>",
  coin:        "<:25pxCoinicon:1492296436132352060>",
  oil:         "<:23pxOilicon:1492296434970660967>",
  gem:         "<:30pxRuby:1492296433645260921>",

  // Rarity
  rarityNormal:    "<:19pxRarity_Normal:1492295425300889620>",
  rarityRare:      "<:22pxRare:1492295423715447005>",
  rarityElite:     "<:20pxElite:1492295422713008278>",
  raritySuperRare: "<:42pxSuperRare:1492295426601390270>",
  rarityUltraRare: "<:45pxUltraRare:1492295427268149338>",
  rarityPriority:  "<:36pxPriority:1492297556078624880>",
  rarityDecisive:  "<:26pxDecisive:1492297555189432422>",
} as const;
