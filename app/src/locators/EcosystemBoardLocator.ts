import { getRelativePlayerIndex, Locator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'
import { LocationType } from '@gamepark/biotopes/material/LocationType'
import { MaterialType } from '@gamepark/biotopes/material/MaterialType'
import { PlayerColor } from '@gamepark/biotopes/PlayerColor'
import { centralLandscapeLocator } from './CentralLandscapeLocator'
import { ecosystemBoardDescription } from '../material/EcosystemBoardDescription'

class EcosystemBoardLocator extends Locator<PlayerColor, MaterialType, LocationType> {
  getCoordinates(location: Location<PlayerColor, LocationType>, context: MaterialContext<PlayerColor, MaterialType, LocationType>): Partial<Coordinates> {
    const index = getRelativePlayerIndex(context, location.player)
    const landscapeSize = centralLandscapeLocator.getLandscapeSize(context.rules.game)
    return { x: index < 2 ? -30 : 20, y: (index === 0 || index === 3 ? 1 : -1) * ((landscapeSize.height + ecosystemBoardDescription.height) / 2 + 3) }
  }
}

export const ecosystemBoardLocator = new EcosystemBoardLocator()
