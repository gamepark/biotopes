import { MountainHerbivoreCharacteristics } from '../../../SpeciesCardCharacteristics'
import { CubeType } from '../../../CubeType'

export class ApolloCharacteristics extends MountainHerbivoreCharacteristics {
  get cubeType(): CubeType {
    return CubeType.Insect
  }

  get effect(): unknown {
    return undefined
  }

  get effectType(): unknown {
    return undefined
  }
}
