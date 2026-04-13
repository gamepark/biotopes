import { CubeType } from '../../../CubeType'
import { MountainInsectivoreCharacteristics } from '../../SpeciesCharacteristics'

export class WallcreeperCharacteristics extends MountainInsectivoreCharacteristics {
  get cubeType(): CubeType {
    return CubeType.Bird
  }

  get diet(): Partial<Record<CubeType, number>> {
    return { [CubeType.Insect]: 2 }
  }

  get effect(): unknown {
    return undefined
  }

  get effectType(): unknown {
    return undefined
  }

}