import { CubeType } from '../../../CubeType'
import { ForestHerbivoreCharacteristics } from '../../SpeciesCharacteristics'

export class TwoTailedPashaCharacteristics extends ForestHerbivoreCharacteristics {
  get cubeType(): CubeType {
    return CubeType.Insect
  }

  get effect(): unknown {
    return undefined
  }

  get effectType(): unknown {
    return undefined
  }
}
