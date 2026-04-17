import { HexagonalGridLocator, HexGridDropAreaDescription, HexOrientation, ItemContext, MaterialContext } from '@gamepark/react-game'
import { Coordinates, HexGridSystem, MaterialGame, MaterialItem, Location, MaterialMove } from '@gamepark/rules-api'
import { landscapeTileDescription } from '../material/LandscapeTileDescription'
import { LocationType } from '@gamepark/biotopes/material/LocationType'
import { MaterialType } from '@gamepark/biotopes/material/MaterialType'
import { PlayerColor } from '@gamepark/biotopes/PlayerColor'
import { LandscapeHelper } from '@gamepark/biotopes/rules/helpers/LandscapeHelper'
import { LandscapeTile } from '@gamepark/biotopes/material/LandscapeTile'
import { RuleId } from '@gamepark/biotopes/rules/RuleId'
import { BiotopeType } from '@gamepark/biotopes/material/BiotopeType'

class CentralLandscapeLocator extends HexagonalGridLocator<PlayerColor, MaterialType, LocationType, BiotopeType, RuleId, PlayerColor> {
  coordinatesSystem = HexGridSystem.Axial
  orientation = HexOrientation.Flat
  size = { x: landscapeTileDescription.width / 5, y: landscapeTileDescription.height / 5.125 }
  coordinates = { x: 22.5, y: -10 }
  locationDescription = new CentralLandscapeDropAreaDescription()

  getLandscapeSize(game: MaterialGame<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>) {
    const landscape = new LandscapeHelper(game).landscape
    const { xMin, xMax, yMin, yMax } = this.getBoundaries(landscape)
    return { width: xMax - xMin, height: yMax - yMin }
  }

  getItemCoordinates(item: MaterialItem, context: ItemContext): Partial<Coordinates> {
    const { x = 0, y = 0 } = super.getItemCoordinates(item, context)
    const z = context.type === MaterialType.TerritoryToken ? 0.2 : 0
    return { x, y, z }
  }

  getLocations(context: MaterialContext<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>): Partial<Location<PlayerColor, LocationType>>[] {
     const landscape = new LandscapeHelper(context.rules.game).gridWithCoordinates
     return landscape.map(({ x, y }) => ({ type: LocationType.CentralLandscapeSpot, x: x, y: y }))
  }
}

class CentralLandscapeDropAreaDescription extends HexGridDropAreaDescription<
  PlayerColor,
  MaterialType,
  LocationType,
  LandscapeTile | PlayerColor,
  RuleId,
  PlayerColor
> {
  width = landscapeTileDescription.width / 5
  height = landscapeTileDescription.height / 5.125

  public isMoveToLocation(
    move: MaterialMove<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>,
    location: Location<PlayerColor, LocationType>,
    context: MaterialContext<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>
  ): boolean {
    if (location.x === undefined && location.y === undefined) {
      return false
    }
    return super.isMoveToLocation(move, location, context)
  }
}

export const centralLandscapeLocator = new CentralLandscapeLocator()
