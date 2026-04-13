import { CubeType } from '../../../CubeType'
import { ForestHerbivoreCharacteristics } from '../../SpeciesCharacteristics'

export class HazelDormouseCharacteristics extends ForestHerbivoreCharacteristics {
  get cubeType(): CubeType {
    return CubeType.Mammal
  }

  get effect(): unknown {
    return undefined
  }

  get effectType(): unknown {
    return undefined
  }
}
