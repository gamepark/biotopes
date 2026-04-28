import { CubeType } from '../../../CubeType'
import { ForestHerbivoreCharacteristics } from '../../SpeciesCharacteristics'
import { SpeciesCardEffect } from '../../../SpeciesCardEffect'

export class EuropeanHareCharacteristics extends ForestHerbivoreCharacteristics {
  get cubeType(): CubeType {
    return CubeType.Mammal
  }

  get effect(): unknown {
    return SpeciesCardEffect.DiscreetSpecies
  }

  get effectType(): unknown {
    return undefined
  }
}
