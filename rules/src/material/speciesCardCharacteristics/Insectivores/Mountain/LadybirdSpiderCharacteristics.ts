import { CubeType } from '../../../CubeType'
import { MountainInsectivoreCharacteristics } from '../../SpeciesCharacteristics'

export class LadybirdSpiderCharacteristics extends MountainInsectivoreCharacteristics {
  get cubeType(): CubeType {
    return CubeType.Insect
  }

  get diet(): Partial<Record<CubeType, number>> {
    return { [CubeType.Insect]: 3 }
  }

  get effect(): unknown {
    return undefined
  }

  get effectType(): unknown {
    return undefined
  }
}
