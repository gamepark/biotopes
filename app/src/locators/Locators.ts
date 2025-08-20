import { LocationType } from '@gamepark/biotopes/material/LocationType'
import { MaterialType } from '@gamepark/biotopes/material/MaterialType'
import { PlayerColor } from '@gamepark/biotopes/PlayerColor'
import { Locator } from '@gamepark/react-game'
import { centralLandscapeLocator } from './CentralLandscapeLocator'
import { ecosystemBoardLocator } from './EcosystemBoardLocator'
import { environmentalConditionsBoardLocator } from './EnvironmentalConditionsBoardLocator'
import { initiativeTokenLocator } from './InitiativeTokenLocator'
import { cycleTokenLocator } from './CycleTokenLocator'
import { environmentalConditionsTokenLocator } from './EnvironmentalConditionsTokenLocator'
import { playerBiotopeCardsLocator } from './PlayerBiotopeCardsLocator'

export const Locators: Partial<Record<LocationType, Locator<PlayerColor, MaterialType, LocationType>>> = {
  [LocationType.CentralLandscapeSpot]: centralLandscapeLocator,
  [LocationType.CycleTokenSpotOnEnviromnentalConditionsBoard]: cycleTokenLocator,
  [LocationType.EcosystemBoardSpot]: ecosystemBoardLocator,
  [LocationType.EnvironmentalConditionsBoardSpot]: environmentalConditionsBoardLocator,
  [LocationType.EnvironmentalConditionTokenSpotOnEnviromnentalConditionsBoard]: environmentalConditionsTokenLocator,
  [LocationType.PlayerBiotopesCardSpot]: playerBiotopeCardsLocator,
  [LocationType.PlayerInitiativeTokenSpot]: initiativeTokenLocator
}
