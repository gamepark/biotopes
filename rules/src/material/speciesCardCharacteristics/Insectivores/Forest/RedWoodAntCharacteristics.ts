import { CubeType } from '../../../CubeType'
import { ForestInsectivoreCharacteristics } from '../../SpeciesCharacteristics'

export class RedWoodAntCharacteristics extends ForestInsectivoreCharacteristics {
  get cubeType(): CubeType {
    return CubeType.Insect
  }

  get diet(): Partial<Record<CubeType, number>> {
    return { [CubeType.Plant]: 1, [CubeType.Insect]: 2 }
  }

  get effect(): unknown {
    return undefined
  }

  get effectType(): unknown {
    return undefined
  }

}