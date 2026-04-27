import { LocationType } from '@gamepark/biotopes/material/LocationType'
import { MaterialType } from '@gamepark/biotopes/material/MaterialType'
import { PlayerColor } from '@gamepark/biotopes/PlayerColor'
import { Locator } from '@gamepark/react-game'
import { centralLandscapeLocator } from './CentralLandscapeLocator'
import { cubeOnEcosystemBoardLocator } from './CubeOnEcosystemBoardLocator'
import { cubeOnPlayerSpecieCardLocator } from './CubeOnPlayerSpecieCardLocator'
import { cubeStockpileLocator } from './CubeStockpileLocator'
import { cycleTokenLocator } from './CycleTokenLocator'
import { decksLocator } from './DecksLocator.ts'
import { discardsLocator } from './DiscardsLocator.ts'
import { ecosystemBoardLocator } from './EcosystemBoardLocator'
import { environmentalConditionsBoardLocator } from './EnvironmentalConditionsBoardLocator'
import { environmentalConditionsTokenLocator } from './EnvironmentalConditionsTokenLocator'
import { initiativeTokenLocator } from './InitiativeTokenLocator'
import { playerBiotopeCardsLocator } from './PlayerBiotopeCardsLocator'
import { playerSpecieCardsTableauLocator } from './PlayerSpecieCardsTableauLocator'
import { playerSpeciesCardHandLocator } from './PlayerSpeciesCardHandLocator'
import { recycledCubeLocator } from './RecycledCubeLocator'
import { riversLocator } from './RiversLocator.ts'
import { territoryTokenOnEcosystemBoardLocator } from './TerritoryTokenOnEcosystemBoardLocator'
import { biotopeBoardSelectionLocator } from './BiotopeBoardSelectionLocator.ts'
import { playerBiotopeBoardLocator } from './PlayerBiotopeBoardLocator.ts'
import { cubeOnBiotopeBoardLocator } from './CubeOnBiotopeBoardLocator.ts'

export const Locators: Partial<Record<LocationType, Locator<PlayerColor, MaterialType, LocationType>>> = {
  [LocationType.CentralLandscapeSpot]: centralLandscapeLocator,
  [LocationType.CycleTokenSpotOnEnvironmentalConditionsBoard]: cycleTokenLocator,
  [LocationType.CubeStockpileSpot]: cubeStockpileLocator,
  [LocationType.CubeSpotOnEcosystemBoard]: cubeOnEcosystemBoardLocator,
  [LocationType.CubeSpotOnPlayerSpeciesCard]: cubeOnPlayerSpecieCardLocator,
  [LocationType.EcosystemBoardSpot]: ecosystemBoardLocator,
  [LocationType.EnvironmentalConditionsBoardSpot]: environmentalConditionsBoardLocator,
  [LocationType.EnvironmentalConditionTokenSpotOnEnvironmentalConditionsBoard]: environmentalConditionsTokenLocator,
  [LocationType.SpeciesDecksSpot]: decksLocator,
  [LocationType.SpeciesRiversGrid]: riversLocator,
  [LocationType.SpeciesDiscardsSpot]: discardsLocator,
  [LocationType.PlayerBiotopesCardSpot]: playerBiotopeCardsLocator,
  [LocationType.PlayerInitiativeTokenSpot]: initiativeTokenLocator,
  [LocationType.PlayerSpeciesCardTableauSpot]: playerSpecieCardsTableauLocator,
  [LocationType.PlayerSpeciesCardHandSpot]: playerSpeciesCardHandLocator,
  [LocationType.TerritoryTokenSpotOnEcosystemBoard]: territoryTokenOnEcosystemBoardLocator,
  [LocationType.RecycledCubesSpot]: recycledCubeLocator,
  [LocationType.BiotopeBoardSelectionSpot]: biotopeBoardSelectionLocator,
  [LocationType.BiotopeBoardSpot]: playerBiotopeBoardLocator,
  [LocationType.CubeOnBiotopeBoardSpot]: cubeOnBiotopeBoardLocator
}
