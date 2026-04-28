import { CubeType } from '../../../CubeType'
import { WetlandInsectivoreCharacteristics } from '../../SpeciesCharacteristics'
import { SpeciesCardEffect } from '../../../SpeciesCardEffect'

export class EmperorDragonflyCharacteristics extends WetlandInsectivoreCharacteristics {
  get cubeType(): CubeType {
    return CubeType.Insect
  }

  get diet(): Partial<Record<CubeType, number>> {
    return { [CubeType.Insect]: 2 }
  }

  get effect(): unknown {
    return SpeciesCardEffect.Patroller
  }

  get effectType(): unknown {
    return undefined
  }
}
