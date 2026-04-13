import { CubeType } from '../../../CubeType'
import { MeadowHerbivoreCharacteristics } from '../../SpeciesCharacteristics'

export class BrownRatCharacteristics extends MeadowHerbivoreCharacteristics {
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