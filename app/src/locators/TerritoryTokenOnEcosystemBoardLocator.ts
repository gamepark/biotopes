import { FlexLocator, MaterialContext } from '@gamepark/react-game'
import { MaterialType } from '@gamepark/biotopes/material/MaterialType'
import { Location, MaterialItem } from '@gamepark/rules-api'
import { PlayerColor } from '@gamepark/biotopes/PlayerColor'
import { ecosystemBoardDescription } from '../material/EcosystemBoardDescription'

class TerritoryTokenOnEcosystemBoardLocator extends FlexLocator {
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
}

export const territoryTokenOnEcosystemBoardLocator = new TerritoryTokenOnEcosystemBoardLocator()
