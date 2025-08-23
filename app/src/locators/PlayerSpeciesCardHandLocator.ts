import { LocationType } from '@gamepark/biotopes/material/LocationType'
import { MaterialType } from '@gamepark/biotopes/material/MaterialType'
import { PlayerColor } from '@gamepark/biotopes/PlayerColor'
import { HandLocator, MaterialContext } from '@gamepark/react-game'
import { Location, Coordinates } from '@gamepark/rules-api'

export class PlayerSpeciesCardHandLocator extends HandLocator<PlayerColor, MaterialType, LocationType> {
  radius = 150
  maxAngle = 15
  gapMaxAngle = 1
  clockwise = true

  getBaseAngle(location: Location<number, LocationType, number, number>, context: MaterialContext<number, MaterialType, LocationType>): number {
    const playerBoardCoordinates = context.locators[LocationType.EcosystemBoardSpot]?.getCoordinates(
      { type: LocationType.EcosystemBoardSpot, player: location.player },
      context
    )
    return (playerBoardCoordinates?.y ?? 0) > 0 ? 0 : 180
  }

  getCoordinates(location: Location, context: MaterialContext): Partial<Coordinates> {
    const playerBoardCoordinates = context.locators[LocationType.EcosystemBoardSpot]?.getCoordinates(
      { type: LocationType.EcosystemBoardSpot, player: location.player },
      context
    )
    const BoardY = playerBoardCoordinates?.y ?? 0
    return { x: (playerBoardCoordinates?.x ?? 0) + 10, y: BoardY + (BoardY > 0 ? 1 : -1) * 13 }
  }
}

export const playerSpeciesCardHandLocator = new PlayerSpeciesCardHandLocator()
