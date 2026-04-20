import { CubeType } from '../../../CubeType'
import { MeadowCarnivoreCharacteristics } from '../../SpeciesCharacteristics'

export class OcellatedLizardCharacteristics extends MeadowCarnivoreCharacteristics {
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
