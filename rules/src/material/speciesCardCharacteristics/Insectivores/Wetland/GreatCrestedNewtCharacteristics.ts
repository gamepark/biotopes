import { CubeType } from '../../../CubeType'
import { WetlandInsectivoreCharacteristics } from '../../SpeciesCharacteristics'

export class GreatCrestedNewtCharacteristics extends WetlandInsectivoreCharacteristics {
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