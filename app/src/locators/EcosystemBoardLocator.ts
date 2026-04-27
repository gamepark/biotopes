import { ItemContext, Locator } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import { LocationType } from '@gamepark/biotopes/material/LocationType'
import { MaterialType } from '@gamepark/biotopes/material/MaterialType'
import { PlayerColor } from '@gamepark/biotopes/PlayerColor'
import { RuleId } from '@gamepark/biotopes/rules/RuleId.ts'

class EcosystemBoardLocator extends Locator<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor> {
  coordinates = { x: -45, y: 12.5, z: 0.1 }

  public hide(item: MaterialItem<PlayerColor, LocationType>, context: ItemContext<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>): boolean {
    return item.id !== (context.rules.game.view ?? context.player ?? context.rules.game.players[0])
  }
}

export const ecosystemBoardLocator = new EcosystemBoardLocator()
