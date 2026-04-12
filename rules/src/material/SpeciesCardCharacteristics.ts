import { CubeType } from './CubeType'
import { BiotopeType } from './BiotopeType'
import { SpeciesCard, SpeciesDietType } from './SpeciesCard'
import { countBy, isEqual } from 'es-toolkit'
import { AlpineIbexCharacteristics } from './speciesCards/Herbivores/Mountain/AlpineIbexCharacteristics'
import { ApolloCharacteristics } from './speciesCards/Herbivores/Mountain/ApolloCharacteristics'
import { CitrilFinchCharacteristics } from './speciesCards/Herbivores/Mountain/CitrilFinchCharacteristics'
import { GreenGrasshopperCharacteristics } from './speciesCards/Herbivores/Mountain/GreenGrasshopperCharacteristics'
import { Material } from '@gamepark/rules-api'
import { PlayerColor } from '../PlayerColor'
import { MaterialType } from './MaterialType'
import { LocationType } from './LocationType'
import { MountainHareCharacteristics } from './speciesCards/Herbivores/Mountain/MountainHareCharacteristics'
import { RedDeerCharacteristics } from './speciesCards/Herbivores/Mountain/RedDeerCharacteristics'
import { RosaliaLongicornCharacteristics } from './speciesCards/Herbivores/Mountain/RosaliaLongicornCharacteristics'
import { WesternCapercaillieCharacteristics } from './speciesCards/Herbivores/Mountain/WesternCapercaillieCharacteristics'
import { EurasianBullfinchCharacteristics } from './speciesCards/Herbivores/Forest/EurasianBullfinchCharacteristics'
import { EuropeanHareCharacteristics } from './speciesCards/Herbivores/Forest/EuropeanHareCharacteristics'
import { EuropeanRoseChaferCharacteristics } from './speciesCards/Herbivores/Forest/EuropeanRoseChaferCharacteristics'
import { HawfinchCharacteristics } from './speciesCards/Herbivores/Forest/HawfinchCharacteristics'
import { HazelDormouseCharacteristics } from './speciesCards/Herbivores/Forest/HazelDormouseCharacteristics'
import { MammothWaspCharacteristics } from './speciesCards/Herbivores/Forest/MammothWaspCharacteristics'
import { StagBeetleCharacteristics } from './speciesCards/Herbivores/Forest/StagBeetleCharacteristics'
import { TwoTailedPashaCharacteristics } from './speciesCards/Herbivores/Forest/TwoTailedPashaCharacteristics'
import { WildBoarCharacteristics } from './speciesCards/Herbivores/Forest/WildBoarCharacteristics'

export abstract class SpeciesCardCharacteristics {
  public abstract get biotope(): BiotopeType
  public abstract get cubeType(): CubeType
  public abstract get dietType(): SpeciesDietType
  public abstract get diet(): Partial<Record<CubeType, number>>
  public abstract get effect(): unknown
  public abstract get effectType(): unknown

  public recycledCubesMatchDiet(recycledCubes: Material<PlayerColor, MaterialType, LocationType>): boolean {
    const cubesByTypeCount = countBy(recycledCubes.getItems(), (cube) => cube.location.id as CubeType)
    return isEqual(cubesByTypeCount, this.diet)
  }
}

export abstract class HerbivoreCharacteristics extends SpeciesCardCharacteristics {
  public get dietType(): SpeciesDietType {
    return SpeciesDietType.Herbivore
  }

  get diet(): Partial<Record<CubeType, number>> {
    return { [CubeType.Plant]: 2 }
  }
}

export abstract class MountainHerbivoreCharacteristics extends HerbivoreCharacteristics {
  get biotope(): BiotopeType {
    return BiotopeType.Mountain
  }
}

export class ForestHerbivoreCharacteristics extends HerbivoreCharacteristics {
  get biotope(): BiotopeType {
    return BiotopeType.Forest
  }
}

export class MeadowHerbivoreCharacteristics extends HerbivoreCharacteristics {
  get biotope(): BiotopeType {
    return BiotopeType.Meadow
  }
}

export class WetlandHerbivoreCharacteristics extends HerbivoreCharacteristics {
  get biotope(): BiotopeType {
    return BiotopeType.Wetland
  }
}

export const speciesCardCharacteristics: Partial<Record<SpeciesCard, SpeciesCardCharacteristics>> = {
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
  [SpeciesCard.WildBoar]: new WildBoarCharacteristics(),
}
