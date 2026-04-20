import { CubeType } from '../../../CubeType'
import { ForestCarnivoreCharacteristics } from '../../SpeciesCharacteristics'

export class TawnyOwlCharacteristics extends ForestCarnivoreCharacteristics {
  get cubeType(): CubeType {
    return CubeType.Bird
  }

  get diet(): Partial<Record<CubeType, number>> {
    return { [CubeType.Mammal]: 2, [CubeType.Bird]: 1 }
  }

  get effect(): unknown {
    return undefined
  }

  get effectType(): unknown {
    return undefined
  }
}
