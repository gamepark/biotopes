import { CubeType } from '../../../CubeType'
import { ForestCarnivoreCharacteristics } from '../../SpeciesCharacteristics'

export class EurasianHobbyCharacteristics extends ForestCarnivoreCharacteristics {
  get cubeType(): CubeType {
    return CubeType.Bird
  }

  get diet(): Partial<Record<CubeType, number>> {
    return { [CubeType.Insect]: 1, [CubeType.Bird]: 2 }
  }

  get effect(): unknown {
    return undefined
  }

  get effectType(): unknown {
    return undefined
  }

}