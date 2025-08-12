import { HexagonalGridLocator, HexOrientation } from '@gamepark/react-game'
import { HexGridSystem, MaterialGame } from '@gamepark/rules-api'
import { landscapeTileDescription } from '../material/LandscapeTileDescription'
import { LocationType } from '@gamepark/biotopes/material/LocationType'
import { MaterialType } from '@gamepark/biotopes/material/MaterialType'
import { PlayerColor } from '@gamepark/biotopes/PlayerColor'
import { LandscapeHelper } from '@gamepark/biotopes/rules/helpers/LandscapeHelper'

class CentralLandscapeLocator extends HexagonalGridLocator {
  coordinatesSystem = HexGridSystem.Axial
  orientation = HexOrientation.Flat
  size = { x: landscapeTileDescription.width / 5, y: landscapeTileDescription.height / 5.125 }

  getLandscapeSize(game: MaterialGame<PlayerColor, MaterialType, LocationType>) {
    const landscape = new LandscapeHelper(game).landscape
    const { xMin, xMax, yMin, yMax } = this.getBoundaries(landscape)
    return { width: xMax - xMin, height: yMax - yMin }
  }

  // getCoordinates(location: Location, context: MaterialContext): Partial<Coordinates> {
  //   const landscape = new LandscapeHelper(context.rules.game).landscape
  //   const coord = super.getCoordinates(location, context)
  //   const { xMin, xMax, yMin, yMax } = this.getBoundaries(landscape)
  //   return { x: coord.x! - (xMin + xMax) / 2, y: coord.y! - (yMin + yMax) / 2 }
  // }
}

export const centralLandscapeLocator = new CentralLandscapeLocator()
