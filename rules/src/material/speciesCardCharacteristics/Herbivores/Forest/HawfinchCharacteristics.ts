import { CubeType } from '../../../CubeType'
import { ForestHerbivoreCharacteristics } from '../../SpeciesCharacteristics'
import { SpeciesCardEffect } from '../../../SpeciesCardEffect'

export class HawfinchCharacteristics extends ForestHerbivoreCharacteristics {
  get cubeType(): CubeType {
    return CubeType.Bird
  }

  get effect(): unknown {
    return SpeciesCardEffect.DiscreetSpecies
  }

  get effectType(): unknown {
    return undefined
  }
}
