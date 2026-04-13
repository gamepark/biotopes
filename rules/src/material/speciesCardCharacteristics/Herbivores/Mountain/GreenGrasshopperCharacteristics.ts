import { CubeType } from '../../../CubeType'
import { MountainHerbivoreCharacteristics } from '../../SpeciesCharacteristics'

export class GreenGrasshopperCharacteristics extends MountainHerbivoreCharacteristics {
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
