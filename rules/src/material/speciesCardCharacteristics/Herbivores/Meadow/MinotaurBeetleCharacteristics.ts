import { CubeType } from '../../../CubeType'
import { MeadowHerbivoreCharacteristics } from '../../SpeciesCharacteristics'
import { SpeciesCardEffect } from '../../../SpeciesCardEffect'

export class MinotaurBeetleCharacteristics extends MeadowHerbivoreCharacteristics {
  get cubeType(): CubeType {
    return CubeType.Insect
  }

  get effect(): unknown {
    return SpeciesCardEffect.DetritivoreSpecies
  }

  get effectType(): unknown {
    return undefined
  }
}
