import { LocationType } from '@gamepark/biotopes/material/LocationType'
import { ItemContext, ListLocator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location, MaterialItem } from '@gamepark/rules-api'
import { PlayerColor } from '@gamepark/biotopes/PlayerColor.ts'
import { MaterialType } from '@gamepark/biotopes/material/MaterialType.ts'
import { RuleId } from '@gamepark/biotopes/rules/RuleId.ts'

class PlayerBiotopeCardsLocator extends ListLocator<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor> {
  gap = { y: 4.75 }
  maxCount = 4

  getCoordinates(location: Location, context: MaterialContext): Partial<Coordinates> {
    const playerBoardCoordinates = context.locators[LocationType.EcosystemBoardSpot]?.getCoordinates(
      { type: LocationType.EcosystemBoardSpot, player: location.player },
      context
    )
    return { x: (playerBoardCoordinates?.x ?? 0) + 10, y: (playerBoardCoordinates?.y ?? 0) - 11.86 + (location.id ?? 1) * 4.75 }
  }

  public hide(item: MaterialItem<PlayerColor, LocationType>, context: ItemContext<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>): boolean {
    return item.location.player !== (context.rules.game.view ?? context.player ?? context.rules.players[0])
  }
}

export const playerBiotopeCardsLocator = new PlayerBiotopeCardsLocator()
