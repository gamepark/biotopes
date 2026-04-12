import { ForestHerbivoreCharacteristics } from '../../../SpeciesCardCharacteristics'
import { CubeType } from '../../../CubeType'

export class HawfinchCharacteristics extends ForestHerbivoreCharacteristics {
  get cubeType(): CubeType {
    return CubeType.Bird
  }

  get effect(): unknown {
    return undefined
  }

  get effectType(): unknown {
    return undefined
  }
}
