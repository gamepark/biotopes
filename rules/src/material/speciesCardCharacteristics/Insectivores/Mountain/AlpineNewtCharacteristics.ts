import { CubeType } from '../../../CubeType'
import { MountainInsectivoreCharacteristics } from '../../SpeciesCharacteristics'
import { SpeciesCardEffect } from '../../../SpeciesCardEffect'

export class AlpineNewtCharacteristics extends MountainInsectivoreCharacteristics {
  get cubeType(): CubeType {
    return CubeType.AmphibianReptile
  }

  get diet(): Partial<Record<CubeType, number>> {
    return { [CubeType.Insect]: 2 }
  }

  get effect(): unknown {
    return SpeciesCardEffect.AdaptativeIntelligence
  }

  get effectType(): unknown {
    return undefined
  }
}
