import { CubeType } from '../../../CubeType'
import { ForestCarnivoreCharacteristics } from '../../SpeciesCharacteristics'
import { SpeciesCardEffect } from '../../../SpeciesCardEffect'

export class EuropeanPineMartenCharacteristics extends ForestCarnivoreCharacteristics {
  get cubeType(): CubeType {
    return CubeType.Mammal
  }

  get diet(): Partial<Record<CubeType, number>> {
    return { [CubeType.Insect]: 1, [CubeType.Mammal]: 1, [CubeType.Bird]: 1 }
  }

  get effect(): unknown {
    return SpeciesCardEffect.DiscreetSpecies
  }

  get effectType(): unknown {
    return undefined
  }
}
