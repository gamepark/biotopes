import { CubeType } from '../../../CubeType'
import { MountainInsectivoreCharacteristics } from '../../SpeciesCharacteristics'

export class AlpineMarmotCharacteristics extends MountainInsectivoreCharacteristics {
  get cubeType(): CubeType {
    return CubeType.Mammal
  }

  get diet(): Partial<Record<CubeType, number>> {
    return { [CubeType.Plant]: 1, [CubeType.Insect]: 1 }
  }

  get effect(): unknown {
    return undefined
  }

  get effectType(): unknown {
    return undefined
  }
}
