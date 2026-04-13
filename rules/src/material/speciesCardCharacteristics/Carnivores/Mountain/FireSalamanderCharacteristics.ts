import { CubeType } from '../../../CubeType'
import { MountainCarnivoreCharacteristics } from '../../SpeciesCharacteristics'

export class FireSalamanderCharacteristics extends MountainCarnivoreCharacteristics {
  get cubeType(): CubeType {
    return CubeType.AmphibianReptile
  }

  get diet(): Partial<Record<CubeType, number>> {
    return { [CubeType.Insect]: 2, [CubeType.AmphibianReptile]: 1 }
  }

  get effect(): unknown {
    return undefined
  }

  get effectType(): unknown {
    return undefined
  }

}