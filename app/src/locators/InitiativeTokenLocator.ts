import { LocationType } from '@gamepark/biotopes/material/LocationType'
import { MaterialType } from '@gamepark/biotopes/material/MaterialType.ts'
import { PlayerColor } from '@gamepark/biotopes/PlayerColor.ts'
import { RuleId } from '@gamepark/biotopes/rules/RuleId.ts'
import { ItemContext, Locator } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import { ecosystemBoardLocator } from './EcosystemBoardLocator.ts'

class InitiativeTokenLocator extends Locator<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor> {
  coordinates = { x: ecosystemBoardLocator.coordinates.x - 8, y: ecosystemBoardLocator.coordinates.y - 10}

  public hide(item: MaterialItem<PlayerColor, LocationType>, context: ItemContext<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>): boolean {
    return item.location.player !== (context.rules.game.view ?? context.player ?? context.rules.game.players[0])
  }
}

export const initiativeTokenLocator = new InitiativeTokenLocator()
