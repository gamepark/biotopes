import { CubeType } from '../../../CubeType'
import { WetlandCarnivoreCharacteristics } from '../../SpeciesCharacteristics'

export class GreatDivingBeetleCharacteristics extends WetlandCarnivoreCharacteristics {
  get cubeType(): CubeType {
    return CubeType.Insect
  }

  get diet(): Partial<Record<CubeType, number>> {
    return { [CubeType.Insect]: 1, [CubeType.AmphibianReptile]: 2 }
  }

  get effect(): unknown {
    return undefined
  }

  get effectType(): unknown {
    return undefined
  }
}
