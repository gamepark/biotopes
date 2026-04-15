import { BiotopeCard, getBiotopeCardType } from '@gamepark/biotopes/material/BiotopeCard.ts'
import { BiotopeType } from '@gamepark/biotopes/material/BiotopeType.ts'
import { LocationType } from '@gamepark/biotopes/material/LocationType.ts'
import { MaterialType } from '@gamepark/biotopes/material/MaterialType'
import { PlayerColor } from '@gamepark/biotopes/PlayerColor.ts'
import { RuleId } from '@gamepark/biotopes/rules/RuleId.ts'
import { ItemContext, MaterialContext, PileLocator } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'

class CubeOnPlayerBiotopeCardLocator extends PileLocator<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor> {
  parentItemType = MaterialType.BiotopesCard
  radius = { x: 1, y: 0.5 }

  positionOnParent = { x: 25, y: 20 }

  public getParentItem(location: Location<PlayerColor, LocationType, BiotopeType>, context: MaterialContext<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>): MaterialItem<PlayerColor, LocationType> | undefined {
    const player = location.player
    return context.rules.material(MaterialType.BiotopesCard)
      .location(LocationType.PlayerBiotopesCardSpot)
      .player(player)
      .id<BiotopeCard>((id) => getBiotopeCardType(id) === location.id)
      .getItem()
  }

  public hide(item: MaterialItem<PlayerColor, LocationType>, context: ItemContext<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>): boolean {
    return item.location.player !== (context.rules.game.view ?? context.player ?? context.rules.game.players[0])
  }
}

export const cubeOnPlayerBiotopeCardLocator = new CubeOnPlayerBiotopeCardLocator()
