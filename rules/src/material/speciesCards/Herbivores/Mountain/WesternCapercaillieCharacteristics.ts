import { MountainHerbivoreCharacteristics } from '../../../SpeciesCardCharacteristics'
import { CubeType } from '../../../CubeType'

export class WesternCapercaillieCharacteristics extends MountainHerbivoreCharacteristics {
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
