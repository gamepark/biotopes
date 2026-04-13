import { CubeType } from '../../../CubeType'
import { MeadowHerbivoreCharacteristics } from '../../SpeciesCharacteristics'

export class CommonLinnetCharacteristics extends MeadowHerbivoreCharacteristics {
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