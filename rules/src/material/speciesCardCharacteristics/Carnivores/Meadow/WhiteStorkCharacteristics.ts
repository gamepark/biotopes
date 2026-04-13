import { CubeType } from '../../../CubeType'
import { MeadowCarnivoreCharacteristics } from '../../SpeciesCharacteristics'

export  class WhiteStorkCharacteristics extends MeadowCarnivoreCharacteristics {
  get cubeType(): CubeType {
    return CubeType.Bird
  }

  get diet(): Partial<Record<CubeType, number>> {
    return { [CubeType.Insect]: 1, [CubeType.Mammal]: 1, [CubeType.AmphibianReptile]: 1 }
  }

  get effect(): unknown {
    return undefined
  }

  get effectType(): unknown {
    return undefined
  }

}