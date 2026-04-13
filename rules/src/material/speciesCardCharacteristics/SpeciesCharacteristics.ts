import { Material } from '@gamepark/rules-api'
import { countBy, isEqual } from 'es-toolkit'
import { PlayerColor } from '../../PlayerColor'
import { BiotopeType } from '../BiotopeType'
import { CubeType } from '../CubeType'
import { LocationType } from '../LocationType'
import { MaterialType } from '../MaterialType'
import { SpeciesDietType } from '../SpeciesCard'

export abstract class SpeciesCharacteristics {
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

export abstract class HerbivoreCharacteristics extends SpeciesCharacteristics {
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
