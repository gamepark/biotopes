import { ItemContext, Locator } from '@gamepark/react-game'
import { PlayerColor } from '@gamepark/biotopes/PlayerColor.ts'
import { MaterialType } from '@gamepark/biotopes/material/MaterialType.ts'
import { LocationType } from '@gamepark/biotopes/material/LocationType.ts'
import { RuleId } from '@gamepark/biotopes/rules/RuleId.ts'
import { ecosystemBoardLocator } from './EcosystemBoardLocator.ts'
import { MaterialItem } from '@gamepark/rules-api'

class PlayerBiotopeBoardLocator extends Locator<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor> {
  coordinates = { x: ecosystemBoardLocator.coordinates.x + 9.625, y: ecosystemBoardLocator.coordinates.y - 0.46 }

  public hide(item: MaterialItem<PlayerColor, LocationType>, context: ItemContext<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>): boolean {
    return item.location.player !== (context.rules.game.view ?? context.player ?? context.rules.game.players[0])
  }
}

export const playerBiotopeBoardLocator = new PlayerBiotopeBoardLocator()
