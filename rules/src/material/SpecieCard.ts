import { getEnumValues } from '@gamepark/rules-api'

export enum SpecieDietType {
  Herbivore = 1,
  Insectivore,
  Carnivore
}

export enum SpecieCard {
  // Herbivore
  AlpineIbex = 110,
  Apollo,
  CitrilFinch,
  GreenGrasshopper,
  MountainHare,
  RedheadedMillipede,
  RosaliaLongicorn,
  WesternCapercaillie,
  RedDeer,
  EurasianBullfinch = 120,
  EuropeanHare,
  EuropeanRoseChafer,
  Hawfinch,
  HazelDormouse,
  MammothWasp,
  StagBeetle,
  TwotailedPasha,
  WildBoar,
  BrownRat = 130,
  CommonLinnet,
  EurasianHarvestMouse,
  EuropeanGoldfinch,
  EuropeanHarvesterAnt,
  EuropeanRabbit,
  MinotaurBeetle,
  SpanishFestoon,
  WesternHoneybee,
  CanadaThistleGallFly = 140,
  CommonHouseMosquito,
  CommonBladderSnail,
  CommonReedBunting,
  EurasianBeaver,
  LargeCopper,
  MuteSwan,
  NorthernPintail,
  SouthwesternWaterVole,

  // Insectivore
  AlpineMarmot = 210,
  AlpineNewt,
  LadybirdSpider,
  PyreneanDesman,
  RedbilledChough,
  ViviparousLizard,
  Wallcreeper,
  EuropeanCrestedTit = 220,
  EuropeanHornet,
  EuropeanTreeFrog,
  GreenWoodpecker,
  MarbledNewt,
  RedwoodAnt,
  WesternGreenLizard,
  CommonParsleyFrog = 230,
  EuropeanBeeEater,
  EuropeanHedgehog,
  GreaterHorseshoeBat,
  NatterjackToad,
  SpanishPsammodromus,
  SpikedMagician,
  BeardedReedling = 240,
  CommonWaterFrog,
  DaubentonsBat,
  EmperorDragonfly,
  GrassFrog,
  GreatCrestedNewt,
  YellowBelliedToad,

  // Carnivore
  AspicViper = 310,
  BeardedVulture,
  EurasianLynx,
  EuropeanPolecat,
  FireSalamander,
  PeregrineFalcon,
  CommonGenet = 320,
  EurasianBadger,
  EurasianHobby,
  EuropeanPineMarten,
  EuropeanRoller,
  TawnyOwl,
  GreenWhipSnake = 330,
  Merlin,
  OcellatedLizard,
  RedFox,
  RedKite,
  WhiteStork,
  BarredGrassSnake = 340,
  EuropeanOtter,
  EuropeanPondTerrapin,
  GreatDivingBeetle,
  SquaccoHeron,
  ViperineWaterSnake
}

export enum SpecieCardType {
  HerbivoreMountain = 11,
  HerbivoreForest,
  HerbivoreMeadow,
  HerbivoreWetland,
  InsectivoreMountain = 21,
  InsectivoreForest,
  InsectivoreMeadow,
  InsectivoreWetland,
  CarnivoreMountain = 31,
  CarnivoreForest,
  CarnivoreMeadow,
  CarnivoreWetland
}

export type SpecieCardId = {
  front?: SpecieCard
  back: SpecieCardType
}

export type KnownSpecieCardId = {
  front: SpecieCard
  back: SpecieCardType
}

export const specieCards = getEnumValues(SpecieCard)

export const herbivoreCard = specieCards.slice(0, 36)
export const insectivoreCard = specieCards.slice(36, 64)
export const carnivoreCard = specieCards.slice(64, 90)

export const getSpecieCardType = (cardId: SpecieCard): SpecieCardType => Math.floor(cardId / 10)
