import { MountainHerbivoreCharacteristics } from '../../../SpeciesCardCharacteristics'
import { CubeType } from '../../../CubeType'

export class RedDeerCharacteristics extends MountainHerbivoreCharacteristics {
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
