import { CubeType } from '../../../CubeType'
import { WetlandHerbivoreCharacteristics } from '../../SpeciesCharacteristics'

export class SouthwesternWaterVoleCharacteristics extends WetlandHerbivoreCharacteristics {
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