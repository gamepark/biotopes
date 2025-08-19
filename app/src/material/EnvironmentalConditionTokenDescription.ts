import { LocationType } from '@gamepark/biotopes/material/LocationType'
import { MaterialType } from '@gamepark/biotopes/material/MaterialType'
import { PlayerColor } from '@gamepark/biotopes/PlayerColor'
import { TokenDescription } from '@gamepark/react-game'
import { EnvironmentalConditionToken } from '@gamepark/biotopes/material/EnvironmentalConditionToken'
import MountainToken from '../images/Token/EnvironmentalConditionsToken/MountainToken.jpg'
import ForestToken from '../images/Token/EnvironmentalConditionsToken/ForestToken.jpg'
import MeadowToken from '../images/Token/EnvironmentalConditionsToken/MeadowToken.jpg'
import WetlandToken from '../images/Token/EnvironmentalConditionsToken/WetlandToken.jpg'
import AmphibianReptileToken from '../images/Token/EnvironmentalConditionsToken/AmphibianReptileToken.jpg'
import BirdToken from '../images/Token/EnvironmentalConditionsToken/BirdToken.jpg'
import InsectToken from '../images/Token/EnvironmentalConditionsToken/InsectToken.jpg'
import MammalToken from '../images/Token/EnvironmentalConditionsToken/MammalToken.jpg'

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
