import { CubeType } from '../../../CubeType'
import { MeadowHerbivoreCharacteristics } from '../../SpeciesCharacteristics'

export class SpanishFestoonCharacteristics extends MeadowHerbivoreCharacteristics {
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