import { CubeType } from '../../../CubeType'
import { MountainHerbivoreCharacteristics } from '../../SpeciesCharacteristics'
import { SpeciesCardEffect } from '../../../SpeciesCardEffect'

export class WesternCapercaillieCharacteristics extends MountainHerbivoreCharacteristics {
  get cubeType(): CubeType {
    return CubeType.Bird
  }

  get effect(): unknown {
    return SpeciesCardEffect.MountainSpecies
  }

  get effectType(): unknown {
    return undefined
  }
}
