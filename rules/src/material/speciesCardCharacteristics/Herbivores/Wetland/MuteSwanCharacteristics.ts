import { CubeType } from '../../../CubeType'
import { WetlandHerbivoreCharacteristics } from '../../SpeciesCharacteristics'

export class MuteSwanCharacteristics extends WetlandHerbivoreCharacteristics {
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