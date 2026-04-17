import { CubeType } from '../../../CubeType'
import { WetlandCarnivoreCharacteristics } from '../../SpeciesCharacteristics'

export class EuropeanOtterCharacteristics extends WetlandCarnivoreCharacteristics {
  get cubeType(): CubeType {
    return CubeType.Mammal
  }

  get diet(): Partial<Record<CubeType, number>> {
    return { [CubeType.Plant]: 2, [CubeType.Insect]: 1, [CubeType.AmphibianReptile]: 1 }
  }

  get effect(): unknown {
    return undefined
  }

  get effectType(): unknown {
    return undefined
  }
}
