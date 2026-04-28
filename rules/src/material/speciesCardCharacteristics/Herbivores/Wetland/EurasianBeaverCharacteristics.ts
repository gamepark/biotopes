import { CubeType } from '../../../CubeType'
import { WetlandHerbivoreCharacteristics } from '../../SpeciesCharacteristics'
import { SpeciesCardEffect } from '../../../SpeciesCardEffect'

export class EurasianBeaverCharacteristics extends WetlandHerbivoreCharacteristics {
  get cubeType(): CubeType {
    return CubeType.Mammal
  }

  get effect(): unknown {
    return SpeciesCardEffect.AdaptativeIntelligence
  }

  get effectType(): unknown {
    return undefined
  }
}
