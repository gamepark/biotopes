import { CubeType } from '../../../CubeType'
import { WetlandInsectivoreCharacteristics } from '../../SpeciesCharacteristics'
import { SpeciesCardEffect } from '../../../SpeciesCardEffect'

export class CommonWaterFrogCharacteristics extends WetlandInsectivoreCharacteristics {
  get cubeType(): CubeType {
    return CubeType.AmphibianReptile
  }

  get diet(): Partial<Record<CubeType, number>> {
    return { [CubeType.Plant]: 1, [CubeType.Insect]: 1 }
  }

  get effect(): unknown {
    return SpeciesCardEffect.WidespreadSpecies
  }

  get effectType(): unknown {
    return undefined
  }
}
