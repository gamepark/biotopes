import { ItemContext, ListLocator } from '@gamepark/react-game'
import { PlayerColor } from '@gamepark/biotopes/PlayerColor.ts'
import { MaterialType } from '@gamepark/biotopes/material/MaterialType.ts'
import { LocationType } from '@gamepark/biotopes/material/LocationType.ts'
import { RuleId } from '@gamepark/biotopes/rules/RuleId.ts'
import { MaterialItem } from '@gamepark/rules-api'
import { biotopeBoardDescription } from '../material/BiotopeBoardDescription.tsx'

class BiotopeBoardSelectionLocator extends ListLocator<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor> {
  coordinates = { x: -biotopeBoardDescription.width - 0.375, y: 7 }
  gap = { x: biotopeBoardDescription.width + 0.75 }

  public hide(item: MaterialItem<PlayerColor, LocationType>, context: ItemContext<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>): boolean {
    return item.location.player !== (context.rules.game.view ?? context.player ?? context.rules.game.players[0])
  }

  public getHoverTransform(
    _item: MaterialItem<PlayerColor, LocationType>,
    _context: ItemContext<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>
  ): string[] {
    return super.getHoverTransform(_item, _context).concat('translateY(-5em)', 'scale(2.5)', 'translateZ(2em)')
  }
}

export const biotopeBoardSelectionLocator = new BiotopeBoardSelectionLocator()
