import { CubeType } from '../../../CubeType'
import { WetlandCarnivoreCharacteristics } from '../../SpeciesCharacteristics'

export class SquaccoHeronCharacteristics extends WetlandCarnivoreCharacteristics {
  get cubeType(): CubeType {
    return CubeType.Bird
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
