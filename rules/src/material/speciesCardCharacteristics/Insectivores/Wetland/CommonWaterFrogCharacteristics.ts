import { CubeType } from '../../../CubeType'
import { WetlandInsectivoreCharacteristics } from '../../SpeciesCharacteristics'

export class CommonWaterFrogCharacteristics extends WetlandInsectivoreCharacteristics {
  get cubeType(): CubeType {
    return CubeType.AmphibianReptile
  }

  get diet(): Partial<Record<CubeType, number>> {
    return { [CubeType.Plant]: 1, [CubeType.Insect]: 1 }
  }

  get effect(): unknown {
    return undefined
  }

  get effectType(): unknown {
    return undefined
  }

}