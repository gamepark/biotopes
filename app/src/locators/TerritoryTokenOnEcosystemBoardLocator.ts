import { FlexLocator, ItemContext, MaterialContext } from '@gamepark/react-game'
import { MaterialType } from '@gamepark/biotopes/material/MaterialType'
import { Location, MaterialItem } from '@gamepark/rules-api'
import { PlayerColor } from '@gamepark/biotopes/PlayerColor'
import { ecosystemBoardDescription } from '../material/EcosystemBoardDescription'
import { LocationType } from '@gamepark/biotopes/material/LocationType.ts'
import { RuleId } from '@gamepark/biotopes/rules/RuleId.ts'

class TerritoryTokenOnEcosystemBoardLocator extends FlexLocator<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor> {
  parentItemType = MaterialType.EcosystemBoard
  gap = { x: 1.8 }
  lineGap = { y: 1.8 }
  lineSize = 6
  maxLines = 2
  maxCount = 12

  positionOnParent = { x: 10, y: 11 }

  getParentItem(location: Location, context: MaterialContext): MaterialItem<PlayerColor> | undefined {
    return ecosystemBoardDescription.getStaticItems(context).find((board) => board.location.player === location.player)
  }

  public hide(item: MaterialItem<PlayerColor, LocationType>, context: ItemContext<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>): boolean {
    return item.location.player !== (context.rules.game.view ?? context.player ?? context.rules.game.players[0])
  }
}

export const territoryTokenOnEcosystemBoardLocator = new TerritoryTokenOnEcosystemBoardLocator()
