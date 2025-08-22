import { ListLocator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'
import { LocationType } from '@gamepark/biotopes/material/LocationType'
import { MaterialType } from '@gamepark/biotopes/material/MaterialType'
import { PlayerColor } from '@gamepark/biotopes/PlayerColor'
import { centralLandscapeLocator } from './CentralLandscapeLocator'

class AdvancedBiotopesSelectionLocator extends ListLocator<PlayerColor, MaterialType, LocationType> {
  gap = { x: 5, z: -1 }
  getCoordinates(location: Location<PlayerColor, LocationType>, context: MaterialContext<PlayerColor, MaterialType, LocationType>): Partial<Coordinates> {
    const landscapeSize = centralLandscapeLocator.getLandscapeSize(context.rules.game)
    return { x: -(landscapeSize.width / 2 + 27), y: -5 + (location.id ?? 1) * 5 }
  }
}

export const advancedBiotopesSelectionLocator = new AdvancedBiotopesSelectionLocator()
