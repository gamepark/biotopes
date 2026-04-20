import { CubeType } from '../../../CubeType'
import { WetlandHerbivoreCharacteristics } from '../../SpeciesCharacteristics'
import { SpeciesCardEffect } from '../../../SpeciesCardEffect'

export class CommonHouseMosquitoCharacteristics extends WetlandHerbivoreCharacteristics {
  get cubeType(): CubeType {
    return CubeType.Insect
  }

  get effect(): unknown {
    return SpeciesCardEffect.FecundSpecies
  }

  get effectType(): unknown {
    return undefined
  }
}
