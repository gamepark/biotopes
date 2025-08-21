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
import { advancedBiotopesSelectionLocator } from './AdvancedBiotopesSelectionLocator'
import { herbivoreDeckLocator } from './HerbivoreDeckLocator'
import { carnivoreDeckLocator } from './CarnivoreDeckLocator'
import { insectivoreDeckLocator } from './InsectivoreDeckLocator'
import { carnivoreDiscardLocator } from './CarnivoreDiscardLocator'
import { herbivoreDiscardLocator } from './HerbivoreDiscardLocator'
import { insectivoreDiscardLocator } from './InsectivoreDiscardLocator'

export const Locators: Partial<Record<LocationType, Locator<PlayerColor, MaterialType, LocationType>>> = {
  [LocationType.AdvancedBiotopesSelectionSpot]: advancedBiotopesSelectionLocator,
  [LocationType.CarnivoreDeckSpot]: carnivoreDeckLocator,
  [LocationType.CarnivoreDiscardSpot]: carnivoreDiscardLocator,
  [LocationType.CentralLandscapeSpot]: centralLandscapeLocator,
  [LocationType.CycleTokenSpotOnEnviromnentalConditionsBoard]: cycleTokenLocator,
  [LocationType.EcosystemBoardSpot]: ecosystemBoardLocator,
  [LocationType.EnvironmentalConditionsBoardSpot]: environmentalConditionsBoardLocator,
  [LocationType.EnvironmentalConditionTokenSpotOnEnviromnentalConditionsBoard]: environmentalConditionsTokenLocator,
  [LocationType.HerbivoreDeckSpot]: herbivoreDeckLocator,
  [LocationType.HerbivoreDiscardSpot]: herbivoreDiscardLocator,
  [LocationType.InsectivoreDeckSpot]: insectivoreDeckLocator,
  [LocationType.InsectivoreDiscardSpot]: insectivoreDiscardLocator,
  [LocationType.PlayerBiotopesCardSpot]: playerBiotopeCardsLocator,
  [LocationType.PlayerInitiativeTokenSpot]: initiativeTokenLocator
}
