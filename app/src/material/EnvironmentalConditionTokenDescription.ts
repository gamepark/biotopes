import { LocationType } from '@gamepark/biotopes/material/LocationType'
import { MaterialType } from '@gamepark/biotopes/material/MaterialType'
import { PlayerColor } from '@gamepark/biotopes/PlayerColor'
import { TokenDescription } from '@gamepark/react-game'
import { EnvironmentalConditionToken } from '@gamepark/biotopes/material/EnvironmentalConditionToken'
import MountainToken from '../images/Token/EnvironmentalConditionsToken/MountainToken.svg?url'
import ForestToken from '../images/Token/EnvironmentalConditionsToken/ForestToken.svg?url'
import MeadowToken from '../images/Token/EnvironmentalConditionsToken/MeadowToken.svg?url'
import WetlandToken from '../images/Token/EnvironmentalConditionsToken/WetlandToken.svg?url'
import AmphibianReptileToken from '../images/Token/EnvironmentalConditionsToken/AmphibianReptileToken.svg?url'
import BirdToken from '../images/Token/EnvironmentalConditionsToken/BirdToken.svg?url'
import InsectToken from '../images/Token/EnvironmentalConditionsToken/InsectToken.svg?url'
import MammalToken from '../images/Token/EnvironmentalConditionsToken/MammalToken.svg?url'

class EnvironmentalConditionTokenDescription extends TokenDescription<PlayerColor, MaterialType, LocationType> {
  height = 2.1
  width = 2.1

  images = {
    [EnvironmentalConditionToken.BiotopeMountain]: MountainToken,
    [EnvironmentalConditionToken.BiotopeForest]: ForestToken,
    [EnvironmentalConditionToken.BiotopeMeadow]: MeadowToken,
    [EnvironmentalConditionToken.BiotopeWetland]: WetlandToken,
    [EnvironmentalConditionToken.SpeciesTypeAmphibianReptile]: AmphibianReptileToken,
    [EnvironmentalConditionToken.SpeciesTypeBird]: BirdToken,
    [EnvironmentalConditionToken.SpeciesTypeInsect]: InsectToken,
    [EnvironmentalConditionToken.SpeciesTypeMammal]: MammalToken
  }
}

export const environmentalConditionTokenDescription = new EnvironmentalConditionTokenDescription()
