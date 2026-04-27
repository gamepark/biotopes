import { CubeType } from '../../../CubeType'
import { MeadowInsectivoreCharacteristics } from '../../SpeciesCharacteristics'
import { SpeciesCardEffect } from '../../../SpeciesCardEffect'

export class SpanishPsammodromusCharacteristics extends MeadowInsectivoreCharacteristics {
  get cubeType(): CubeType {
    return CubeType.AmphibianReptile
  }

  get diet(): Partial<Record<CubeType, number>> {
    return { [CubeType.Insect]: 2 }
  }

  get effect(): unknown {
    return SpeciesCardEffect.RSelectedSpecies
  }

  get effectType(): unknown {
    return undefined
  }
}
