import { CubeType } from '../../../CubeType'
import { MeadowInsectivoreCharacteristics } from '../../SpeciesCharacteristics'
import { SpeciesCardEffect } from '../../../SpeciesCardEffect'

export class NatterjackToadCharacteristics extends MeadowInsectivoreCharacteristics {
  get cubeType(): CubeType {
    return CubeType.AmphibianReptile
  }

  get diet(): Partial<Record<CubeType, number>> {
    return { [CubeType.Plant]: 1, [CubeType.Insect]: 1 }
  }

  get effect(): unknown {
    return SpeciesCardEffect.MeadowSpecies
  }

  get effectType(): unknown {
    return undefined
  }
}
