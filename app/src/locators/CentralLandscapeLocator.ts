import { HexagonalGridLocator, HexOrientation } from '@gamepark/react-game'
import { HexGridSystem } from '@gamepark/rules-api'
import { landscapeTileDescription } from '../material/LandscapeTileDescription'

class CentralLandscapeSpotLocator extends HexagonalGridLocator {
  coordinatesSystem = HexGridSystem.Axial
  orientation = HexOrientation.Flat
  size = { x: landscapeTileDescription.width / 5, y: landscapeTileDescription.height / 5.125 }
}

export const centralLandscapeSpotLocator = new CentralLandscapeSpotLocator()
