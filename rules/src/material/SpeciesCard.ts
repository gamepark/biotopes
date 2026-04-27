import { getEnumValues } from '@gamepark/rules-api'

export enum SpeciesDietType {
  Herbivore = 1,
  Insectivore,
  Carnivore
}

export enum SpeciesCard {
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

export enum SpeciesCardType {
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

export type SpeciesCardId = {
  front?: SpeciesCard
  back: SpeciesCardType
}

export type KnownSpeciesCardId = Required<SpeciesCardId>

export const speciesCards = getEnumValues(SpeciesCard)

export const herbivoreCard = speciesCards.slice(0, 36)
export const insectivoreCard = speciesCards.slice(36, 64)
export const carnivoreCard = speciesCards.slice(64, 90)

export const speciesDietTypes = getEnumValues(SpeciesDietType)

export const getDietTypeFromCardId: (id: SpeciesCardId) => SpeciesDietType = (id) => Math.floor(id.back / 10) as SpeciesDietType
