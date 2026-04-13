import { CubeType } from '../../../CubeType'
import { MountainCarnivoreCharacteristics } from '../../SpeciesCharacteristics'

export class PeregrineFalconCharacteristics extends MountainCarnivoreCharacteristics {
  get cubeType(): CubeType {
    return CubeType.Bird
  }

  get diet(): Partial<Record<CubeType, number>> {
    return { [CubeType.Bird]: 3 }
  }

  get effect(): unknown {
    return undefined
  }

  get effectType(): unknown {
    return undefined
  }

}