import { CubeType } from '../../../CubeType'
import { MountainHerbivoreCharacteristics } from '../../SpeciesCharacteristics'
import { SpeciesCardEffect } from '../../../SpeciesCardEffect'

export class CitrilFinchCharacteristics extends MountainHerbivoreCharacteristics {
  get cubeType(): CubeType {
    return CubeType.Bird
  }

  get effect(): unknown {
    return SpeciesCardEffect.PartialMigrator
  }

  get effectType(): unknown {
    return undefined
  }
}
