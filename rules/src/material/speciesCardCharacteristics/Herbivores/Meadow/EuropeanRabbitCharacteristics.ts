import { CubeType } from '../../../CubeType'
import { MeadowHerbivoreCharacteristics } from '../../SpeciesCharacteristics'
import { SpeciesCardEffect } from '../../../SpeciesCardEffect'

export class EuropeanRabbitCharacteristics extends MeadowHerbivoreCharacteristics {
  get cubeType(): CubeType {
    return CubeType.Mammal
  }

  get effect(): unknown {
    return SpeciesCardEffect.RSelectedSpecies
  }

  get effectType(): unknown {
    return undefined
  }
}
