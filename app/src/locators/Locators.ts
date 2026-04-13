import { LocationType } from '@gamepark/biotopes/material/LocationType'
import { MaterialType } from '@gamepark/biotopes/material/MaterialType'
import { PlayerColor } from '@gamepark/biotopes/PlayerColor'
import { Locator } from '@gamepark/react-game'
import { advancedBiotopesSelectionLocator } from './AdvancedBiotopesSelectionLocator'
import { carnivoreDeckLocator } from './CarnivoreDeckLocator'
import { carnivoreDiscardLocator } from './CarnivoreDiscardLocator'
import { carnivoreRiverLocator } from './CarnivoreRiverLocator'
import { centralLandscapeLocator } from './CentralLandscapeLocator'
import { cubeOnEcosystemBoardLocator } from './CubeOnEcosystemBoardLocator'
import { cubeOnPlayerBiotopeCardLocator } from './CubeOnPlayerBiotopeCardLocator'
import { cubeOnPlayerSpecieCardLocator } from './CubeOnPlayerSpecieCardLocator'
import { cubeStockpileLocator } from './CubeStockpileLocator'
import { cycleTokenLocator } from './CycleTokenLocator'
import { ecosystemBoardLocator } from './EcosystemBoardLocator'
import { environmentalConditionsBoardLocator } from './EnvironmentalConditionsBoardLocator'
import { environmentalConditionsTokenLocator } from './EnvironmentalConditionsTokenLocator'
import { herbivoreDeckLocator } from './HerbivoreDeckLocator'
import { herbivoreDiscardLocator } from './HerbivoreDiscardLocator'
import { herbivoreRiverLocator } from './HerbivoreRiverLocator'
import { initiativeTokenLocator } from './InitiativeTokenLocator'
import { insectivoreDeckLocator } from './InsectivoreDeckLocator'
import { insectivoreDiscardLocator } from './InsectivoreDiscardLocator'
import { insectivoreRiverLocator } from './InsectivoreRiverLocator'
import { playerBiotopeCardsLocator } from './PlayerBiotopeCardsLocator'
import { playerSpecieCardsTableauLocator } from './PlayerSpecieCardsTableauLocator'
import { playerSpeciesCardHandLocator } from './PlayerSpeciesCardHandLocator'
import { recycledCubeLocator } from './RecycledCubeLocator'
import { territoryTokenOnEcosystemBoardLocator } from './TerritoryTokenOnEcosystemBoardLocator'

export const Locators: Partial<Record<LocationType, Locator<PlayerColor, MaterialType, LocationType>>> = {
  [LocationType.AdvancedBiotopesSelectionSpot]: advancedBiotopesSelectionLocator,
  [LocationType.CarnivoreDeckSpot]: carnivoreDeckLocator,
  [LocationType.CarnivoreDiscardSpot]: carnivoreDiscardLocator,
  [LocationType.CarnivoreRiverSpot]: carnivoreRiverLocator,
  [LocationType.CentralLandscapeSpot]: centralLandscapeLocator,
  [LocationType.CycleTokenSpotOnEnvironmentalConditionsBoard]: cycleTokenLocator,
  [LocationType.CubeStockpileSpot]: cubeStockpileLocator,
  [LocationType.CubeSpotOnEcosystemBoard]: cubeOnEcosystemBoardLocator,
  [LocationType.CubeSpotOnPlayerBiotopesCard]: cubeOnPlayerBiotopeCardLocator,
  [LocationType.CubeSpotOnPlayerSpeciesCard]: cubeOnPlayerSpecieCardLocator,
  [LocationType.EcosystemBoardSpot]: ecosystemBoardLocator,
  [LocationType.EnvironmentalConditionsBoardSpot]: environmentalConditionsBoardLocator,
  [LocationType.EnvironmentalConditionTokenSpotOnEnvironmentalConditionsBoard]: environmentalConditionsTokenLocator,
  [LocationType.HerbivoreDeckSpot]: herbivoreDeckLocator,
  [LocationType.HerbivoreDiscardSpot]: herbivoreDiscardLocator,
  [LocationType.HerbivoreRiverSpot]: herbivoreRiverLocator,
  [LocationType.InsectivoreDeckSpot]: insectivoreDeckLocator,
  [LocationType.InsectivoreDiscardSpot]: insectivoreDiscardLocator,
  [LocationType.InsectivoreRiverSpot]: insectivoreRiverLocator,
  [LocationType.PlayerBiotopesCardSpot]: playerBiotopeCardsLocator,
  [LocationType.PlayerInitiativeTokenSpot]: initiativeTokenLocator,
  [LocationType.PlayerSpeciesCardTableauSpot]: playerSpecieCardsTableauLocator,
  [LocationType.PlayerSpeciesCardHandSpot]: playerSpeciesCardHandLocator,
  [LocationType.TerritoryTokenSpotOnEcosystemBoard]: territoryTokenOnEcosystemBoardLocator,
  [LocationType.RecycledCubesSpot]: recycledCubeLocator
}
