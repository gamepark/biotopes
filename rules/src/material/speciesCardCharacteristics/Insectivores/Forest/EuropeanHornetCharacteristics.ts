import { CubeType } from '../../../CubeType'
import { ForestInsectivoreCharacteristics } from '../../SpeciesCharacteristics'

export class EuropeanHornetCharacteristics extends ForestInsectivoreCharacteristics {
  get cubeType(): CubeType {
    return CubeType.Insect
  }

  get diet(): Partial<Record<CubeType, number>> {
    return { [CubeType.Plant]: 1, [CubeType.Insect]: 1 }
  }

  get effect(): unknown {
    return undefined
  }

  get effectType(): unknown {
    return undefined
  }

}