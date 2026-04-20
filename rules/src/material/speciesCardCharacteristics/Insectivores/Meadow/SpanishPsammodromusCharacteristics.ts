import { CubeType } from '../../../CubeType'
import { MeadowInsectivoreCharacteristics } from '../../SpeciesCharacteristics'

export class SpanishPsammodromusCharacteristics extends MeadowInsectivoreCharacteristics {
  get cubeType(): CubeType {
    return CubeType.AmphibianReptile
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
