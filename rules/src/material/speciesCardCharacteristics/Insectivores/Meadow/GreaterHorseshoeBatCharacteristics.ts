import { CubeType } from '../../../CubeType'
import { MeadowInsectivoreCharacteristics } from '../../SpeciesCharacteristics'

export class GreaterHorseshoeBatCharacteristics extends MeadowInsectivoreCharacteristics {
  get cubeType(): CubeType {
    return CubeType.Mammal
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