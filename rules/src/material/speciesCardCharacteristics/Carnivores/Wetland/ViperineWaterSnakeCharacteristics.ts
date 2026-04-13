import { CubeType } from '../../../CubeType'
import { WetlandCarnivoreCharacteristics } from '../../SpeciesCharacteristics'

export class ViperineWaterSnakeCharacteristics extends WetlandCarnivoreCharacteristics {
  get cubeType(): CubeType {
    return CubeType.AmphibianReptile
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