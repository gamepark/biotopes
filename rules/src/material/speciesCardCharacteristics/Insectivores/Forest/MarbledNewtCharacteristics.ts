import { CubeType } from '../../../CubeType'
import { ForestInsectivoreCharacteristics } from '../../SpeciesCharacteristics'

export class MarbledNewtCharacteristics extends ForestInsectivoreCharacteristics {
  get cubeType(): CubeType {
    return CubeType.AmphibianReptile
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
