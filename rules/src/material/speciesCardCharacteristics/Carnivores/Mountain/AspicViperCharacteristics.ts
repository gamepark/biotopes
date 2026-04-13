import { CubeType } from '../../../CubeType'
import { MountainCarnivoreCharacteristics } from '../../SpeciesCharacteristics'

export class AspicViperCharacteristics extends MountainCarnivoreCharacteristics {
  get cubeType(): CubeType {
    return CubeType.AmphibianReptile
  }

  get diet(): Partial<Record<CubeType, number>> {
    return { [CubeType.Mammal]: 1, [CubeType.Bird]: 1, [CubeType.AmphibianReptile]: 1 }
  }

  get effect(): unknown {
    return undefined
  }

  get effectType(): unknown {
    return undefined
  }

}