import { CubeType } from '../../../CubeType'
import { MeadowCarnivoreCharacteristics } from '../../SpeciesCharacteristics'

export class MerlinCharacteristics extends MeadowCarnivoreCharacteristics {
  get cubeType(): CubeType {
    return CubeType.Bird
  }

  get diet(): Partial<Record<CubeType, number>> {
    return { [CubeType.Mammal]: 1, [CubeType.Bird]: 2 }
  }

  get effect(): unknown {
    return undefined
  }

  get effectType(): unknown {
    return undefined
  }

}