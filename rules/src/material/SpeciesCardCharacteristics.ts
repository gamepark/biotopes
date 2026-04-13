import { SpeciesCard } from './SpeciesCard'
import { EurasianBullfinchCharacteristics } from './speciesCardCharacteristics/Herbivores/Forest/EurasianBullfinchCharacteristics'
import { EuropeanHareCharacteristics } from './speciesCardCharacteristics/Herbivores/Forest/EuropeanHareCharacteristics'
import { EuropeanRoseChaferCharacteristics } from './speciesCardCharacteristics/Herbivores/Forest/EuropeanRoseChaferCharacteristics'
import { HawfinchCharacteristics } from './speciesCardCharacteristics/Herbivores/Forest/HawfinchCharacteristics'
import { HazelDormouseCharacteristics } from './speciesCardCharacteristics/Herbivores/Forest/HazelDormouseCharacteristics'
import { MammothWaspCharacteristics } from './speciesCardCharacteristics/Herbivores/Forest/MammothWaspCharacteristics'
import { StagBeetleCharacteristics } from './speciesCardCharacteristics/Herbivores/Forest/StagBeetleCharacteristics'
import { TwoTailedPashaCharacteristics } from './speciesCardCharacteristics/Herbivores/Forest/TwoTailedPashaCharacteristics'
import { WildBoarCharacteristics } from './speciesCardCharacteristics/Herbivores/Forest/WildBoarCharacteristics'
import { BrownRatCharacteristics } from './speciesCardCharacteristics/Herbivores/Meadow/BrownRatCharacteristics'
import { CommonLinnetCharacteristics } from './speciesCardCharacteristics/Herbivores/Meadow/CommonLinnetCharacteristics'
import { EurasianHarvestMouseCharacteristics } from './speciesCardCharacteristics/Herbivores/Meadow/EurasianHarvestMouseCharacteristics'
import { EuropeanGoldfinchCharacteristics } from './speciesCardCharacteristics/Herbivores/Meadow/EuropeanGoldfinchCharacteristics'
import { EuropeanHarvesterAntCharacteristics } from './speciesCardCharacteristics/Herbivores/Meadow/EuropeanHarvesterAntCharacteristics'
import { EuropeanRabbitCharacteristics } from './speciesCardCharacteristics/Herbivores/Meadow/EuropeanRabbitCharacteristics'
import { MinotaurBeetleCharacteristics } from './speciesCardCharacteristics/Herbivores/Meadow/MinotaurBeetleCharacteristics'
import { SpanishFestoonCharacteristics } from './speciesCardCharacteristics/Herbivores/Meadow/SpanishFestoonCharacteristics'
import { WesternHoneyBeeCharacteristics } from './speciesCardCharacteristics/Herbivores/Meadow/WesternHoneyBeeCharacteristics'
import { AlpineIbexCharacteristics } from './speciesCardCharacteristics/Herbivores/Mountain/AlpineIbexCharacteristics'
import { ApolloCharacteristics } from './speciesCardCharacteristics/Herbivores/Mountain/ApolloCharacteristics'
import { CitrilFinchCharacteristics } from './speciesCardCharacteristics/Herbivores/Mountain/CitrilFinchCharacteristics'
import { GreenGrasshopperCharacteristics } from './speciesCardCharacteristics/Herbivores/Mountain/GreenGrasshopperCharacteristics'
import { MountainHareCharacteristics } from './speciesCardCharacteristics/Herbivores/Mountain/MountainHareCharacteristics'
import { RedDeerCharacteristics } from './speciesCardCharacteristics/Herbivores/Mountain/RedDeerCharacteristics'
import { RosaliaLongicornCharacteristics } from './speciesCardCharacteristics/Herbivores/Mountain/RosaliaLongicornCharacteristics'
import { WesternCapercaillieCharacteristics } from './speciesCardCharacteristics/Herbivores/Mountain/WesternCapercaillieCharacteristics'
import { CanadaThistleGallFlyCharacteristics } from './speciesCardCharacteristics/Herbivores/Wetland/CanadaThistleGallFlyCharacteristics'
import { CommonBladderSnailCharacteristics } from './speciesCardCharacteristics/Herbivores/Wetland/CommonBladderSnailCharacteristics'
import { CommonHouseMosquitoCharacteristics } from './speciesCardCharacteristics/Herbivores/Wetland/CommonHouseMosquitoCharacteristics'
import { CommonReedBuntingCharacteristics } from './speciesCardCharacteristics/Herbivores/Wetland/CommonReedBuntingCharacteristics'
import { EurasianBeaverCharacteristics } from './speciesCardCharacteristics/Herbivores/Wetland/EurasianBeaverCharacteristics'
import { LargeCopperCharacteristics } from './speciesCardCharacteristics/Herbivores/Wetland/LargeCopperCharacteristics'
import { MuteSwanCharacteristics } from './speciesCardCharacteristics/Herbivores/Wetland/MuteSwanCharacteristics'
import { NorthernPintailCharacteristics } from './speciesCardCharacteristics/Herbivores/Wetland/NorthernPintailCharacteristics'
import { SouthwesternWaterVoleCharacteristics } from './speciesCardCharacteristics/Herbivores/Wetland/SouthwesternWaterVoleCharacteristics'
import { SpeciesCharacteristics } from './speciesCardCharacteristics/SpeciesCharacteristics'

export const speciesCardCharacteristics: Partial<Record<SpeciesCard, SpeciesCharacteristics>> = {
  // Herbivores
  // Mountain
  [SpeciesCard.AlpineIbex]: new AlpineIbexCharacteristics(),
  [SpeciesCard.Apollo]: new ApolloCharacteristics(),
  [SpeciesCard.CitrilFinch]: new CitrilFinchCharacteristics(),
  [SpeciesCard.GreenGrasshopper]: new GreenGrasshopperCharacteristics(),
  [SpeciesCard.MountainHare]: new MountainHareCharacteristics(),
  [SpeciesCard.RedDeer]: new RedDeerCharacteristics(),
  [SpeciesCard.RedheadedMillipede]: new RedDeerCharacteristics(),
  [SpeciesCard.RosaliaLongicorn]: new RosaliaLongicornCharacteristics(),
  [SpeciesCard.WesternCapercaillie]: new WesternCapercaillieCharacteristics(),
  // Forest
  [SpeciesCard.EurasianBullfinch]: new EurasianBullfinchCharacteristics(),
  [SpeciesCard.EuropeanHare]: new EuropeanHareCharacteristics(),
  [SpeciesCard.EuropeanRoseChafer]: new EuropeanRoseChaferCharacteristics(),
  [SpeciesCard.Hawfinch]: new HawfinchCharacteristics(),
  [SpeciesCard.HazelDormouse]: new HazelDormouseCharacteristics(),
  [SpeciesCard.MammothWasp]: new MammothWaspCharacteristics(),
  [SpeciesCard.StagBeetle]: new StagBeetleCharacteristics(),
  [SpeciesCard.TwotailedPasha]: new TwoTailedPashaCharacteristics(),
  [SpeciesCard.WildBoar]: new WildBoarCharacteristics(),
  // Meadow
  [SpeciesCard.BrownRat]: new BrownRatCharacteristics(),
  [SpeciesCard.CommonLinnet]: new CommonLinnetCharacteristics(),
  [SpeciesCard.EurasianHarvestMouse]: new EurasianHarvestMouseCharacteristics(),
  [SpeciesCard.EuropeanGoldfinch]: new EuropeanGoldfinchCharacteristics(),
  [SpeciesCard.EuropeanHarvesterAnt]: new EuropeanHarvesterAntCharacteristics(),
  [SpeciesCard.EuropeanRabbit]: new EuropeanRabbitCharacteristics(),
  [SpeciesCard.MinotaurBeetle]: new MinotaurBeetleCharacteristics(),
  [SpeciesCard.SpanishFestoon]: new SpanishFestoonCharacteristics(),
  [SpeciesCard.WesternHoneybee]: new WesternHoneyBeeCharacteristics(),
  // Wetland
  [SpeciesCard.CanadaThistleGallFly]: new CanadaThistleGallFlyCharacteristics(),
  [SpeciesCard.CommonBladderSnail]: new CommonBladderSnailCharacteristics(),
  [SpeciesCard.CommonHouseMosquito]: new CommonHouseMosquitoCharacteristics(),
  [SpeciesCard.CommonReedBunting]: new CommonReedBuntingCharacteristics(),
  [SpeciesCard.EurasianBeaver]: new EurasianBeaverCharacteristics(),
  [SpeciesCard.LargeCopper]: new LargeCopperCharacteristics(),
  [SpeciesCard.MuteSwan]: new MuteSwanCharacteristics(),
  [SpeciesCard.NorthernPintail]: new NorthernPintailCharacteristics(),
  [SpeciesCard.SouthwesternWaterVole]: new SouthwesternWaterVoleCharacteristics()
}
