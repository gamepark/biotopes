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
import { AlpineIbexCharacteristics } from './speciesCardCharacteristics/Herbivores/Mountain/AlpineIbexCharacteristics'
import { ApolloCharacteristics } from './speciesCardCharacteristics/Herbivores/Mountain/ApolloCharacteristics'
import { CitrilFinchCharacteristics } from './speciesCardCharacteristics/Herbivores/Mountain/CitrilFinchCharacteristics'
import { GreenGrasshopperCharacteristics } from './speciesCardCharacteristics/Herbivores/Mountain/GreenGrasshopperCharacteristics'
import { MountainHareCharacteristics } from './speciesCardCharacteristics/Herbivores/Mountain/MountainHareCharacteristics'
import { RedDeerCharacteristics } from './speciesCardCharacteristics/Herbivores/Mountain/RedDeerCharacteristics'
import { RosaliaLongicornCharacteristics } from './speciesCardCharacteristics/Herbivores/Mountain/RosaliaLongicornCharacteristics'
import { WesternCapercaillieCharacteristics } from './speciesCardCharacteristics/Herbivores/Mountain/WesternCapercaillieCharacteristics'
import { SpeciesCharacteristics } from './speciesCardCharacteristics/SpeciesCharacteristics'

export const speciesCardCharacteristics: Partial<Record<SpeciesCard, SpeciesCharacteristics>> = {
  [SpeciesCard.AlpineIbex]: new AlpineIbexCharacteristics(),
  [SpeciesCard.Apollo]: new ApolloCharacteristics(),
  [SpeciesCard.CitrilFinch]: new CitrilFinchCharacteristics(),
  [SpeciesCard.GreenGrasshopper]: new GreenGrasshopperCharacteristics(),
  [SpeciesCard.MountainHare]: new MountainHareCharacteristics(),
  [SpeciesCard.RedDeer]: new RedDeerCharacteristics(),
  [SpeciesCard.RedheadedMillipede]: new RedDeerCharacteristics(),
  [SpeciesCard.RosaliaLongicorn]: new RosaliaLongicornCharacteristics(),
  [SpeciesCard.WesternCapercaillie]: new WesternCapercaillieCharacteristics(),
  [SpeciesCard.EurasianBullfinch]: new EurasianBullfinchCharacteristics(),
  [SpeciesCard.EuropeanHare]: new EuropeanHareCharacteristics(),
  [SpeciesCard.EuropeanRoseChafer]: new EuropeanRoseChaferCharacteristics(),
  [SpeciesCard.Hawfinch]: new HawfinchCharacteristics(),
  [SpeciesCard.HazelDormouse]: new HazelDormouseCharacteristics(),
  [SpeciesCard.MammothWasp]: new MammothWaspCharacteristics(),
  [SpeciesCard.StagBeetle]: new StagBeetleCharacteristics(),
  [SpeciesCard.TwotailedPasha]: new TwoTailedPashaCharacteristics(),
  [SpeciesCard.WildBoar]: new WildBoarCharacteristics()
}
