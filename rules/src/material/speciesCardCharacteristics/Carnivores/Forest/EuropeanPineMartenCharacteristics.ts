import { CubeType } from '../../../CubeType'
import { ForestCarnivoreCharacteristics } from '../../SpeciesCharacteristics'

export class EuropeanPineMartenCharacteristics extends ForestCarnivoreCharacteristics {
  get cubeType(): CubeType {
    return CubeType.Mammal
  }

  get diet(): Partial<Record<CubeType, number>> {
    return { [CubeType.Insect]: 1, [CubeType.Mammal]: 1, [CubeType.Bird]: 1 }
  }

  get effect(): unknown {
    return undefined
  }

  get effectType(): unknown {
    return undefined
  }

}