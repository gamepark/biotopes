import { CubeType } from '../../../CubeType'
import { ForestInsectivoreCharacteristics } from '../../SpeciesCharacteristics'

export class EuropeanTreeFrogCharacteristics extends ForestInsectivoreCharacteristics {
  get cubeType(): CubeType {
    return CubeType.AmphibianReptile
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