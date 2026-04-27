import { CubeType } from '../../../CubeType'
import { MountainHerbivoreCharacteristics } from '../../SpeciesCharacteristics'
import { SpeciesCardEffect } from '../../../SpeciesCardEffect'

export class GreenGrasshopperCharacteristics extends MountainHerbivoreCharacteristics {
  get cubeType(): CubeType {
    return CubeType.Insect
  }

  get effect(): unknown {
    return SpeciesCardEffect.RSelectedSpecies
  }

  get effectType(): unknown {
    return undefined
  }
}
