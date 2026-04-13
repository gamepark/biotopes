import { CubeType } from '../../../CubeType'
import { ForestInsectivoreCharacteristics } from '../../SpeciesCharacteristics'

export class GreenWoodpeckerCharacteristics extends ForestInsectivoreCharacteristics {
  get cubeType(): CubeType {
    return CubeType.Bird
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