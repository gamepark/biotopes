import { HexagonalGridLocator, HexGridDropAreaDescription, HexOrientation, ItemContext, MaterialContext } from '@gamepark/react-game'
import { Coordinates, HexGridSystem, MaterialGame, MaterialItem, MaterialMove, Location } from '@gamepark/rules-api'
import { landscapeTileDescription } from '../material/LandscapeTileDescription'
import { LocationType } from '@gamepark/biotopes/material/LocationType'
import { MaterialType } from '@gamepark/biotopes/material/MaterialType'
import { PlayerColor } from '@gamepark/biotopes/PlayerColor'
import { LandscapeHelper } from '@gamepark/biotopes/rules/helpers/LandscapeHelper'
import { LandscapeTile } from '@gamepark/biotopes/material/LandscapeTile.ts'
import { RuleId } from '@gamepark/biotopes/rules/RuleId.ts'

class CentralLandscapeLocator extends HexagonalGridLocator {
  coordinatesSystem = HexGridSystem.Axial
  orientation = HexOrientation.Flat
  size = { x: landscapeTileDescription.width / 5, y: landscapeTileDescription.height / 5.125 }
  coordinates = { x: 22.5, y: -10 }
  locationDescription = new CentralLandscapeDropAreaDescription()

  getLandscapeSize(game: MaterialGame<PlayerColor, MaterialType, LocationType>) {
    const landscape = new LandscapeHelper(game).landscape
    const { xMin, xMax, yMin, yMax } = this.getBoundaries(landscape)
    return { width: xMax - xMin, height: yMax - yMin }
  }

  getItemCoordinates(item: MaterialItem, context: ItemContext): Partial<Coordinates> {
    const { x = 0, y = 0 } = super.getItemCoordinates(item, context)
    const z = context.type === MaterialType.TerritoryToken ? 0.2 : 0
    return { x, y, z }
  }

  // getCoordinates(location: Location, context: MaterialContext): Partial<Coordinates> {
  //   const landscape = new LandscapeHelper(context.rules.game).landscape
  //   const coord = super.getCoordinates(location, context)
  //   const { xMin, xMax, yMin, yMax } = this.getBoundaries(landscape)
  //   return { x: coord.x! - (xMin + xMax) / 2, y: coord.y! - (yMin + yMax) / 2 }
  // }
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

  public canDrop(
    move: MaterialMove<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>,
    location: Location<PlayerColor, LocationType>,
    context: ItemContext<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>
  ): boolean {
    const canDrop = super.canDrop(move, location, context)
    return canDrop
  }

  isMoveToLocation(
    move: MaterialMove<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>,
    location: Location<PlayerColor, LocationType>,
    context: MaterialContext<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>
  ): boolean {
    const isMoveToLocation = super.isMoveToLocation(move, location, context)
    return isMoveToLocation
  }

}

export const centralLandscapeLocator = new CentralLandscapeLocator()
