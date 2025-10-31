import { ListLocator, MaterialContext } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'
import { MaterialType } from '@gamepark/biotopes/material/MaterialType'
import { EcosystemActionType } from '@gamepark/biotopes/material/EcosystemActionType'
import { PlayerColor } from '@gamepark/biotopes/PlayerColor'
import { ecosystemBoardDescription } from '../material/EcosystemBoardDescription'

class CubeOnEcosystemBoardLocator extends ListLocator {
  parentItemType = MaterialType.EcosystemBoard
  gap = { x: 1.21 }
  maxCount = 5

  getParentItem(location: Location, context: MaterialContext): MaterialItem<PlayerColor> | undefined {
    return ecosystemBoardDescription.getStaticItems(context).find((board) => board.location.player === location.player)
  }

  getPositionOnParent(location: Location, _context: MaterialContext) {
    switch (location.id as EcosystemActionType) {
      case EcosystemActionType.Reproduction:
        return { x: 61.7, y: 40 }
      case EcosystemActionType.Transfert:
        return { x: 18.3, y: 51 }
      case EcosystemActionType.Evolution:
        return { x: 18.7, y: 66.75 }
      case EcosystemActionType.Expansion:
        return { x: 20, y: 81.5 }
      case EcosystemActionType.Competition:
        return { x: 20, y: 92.5 }
      case EcosystemActionType.Migration:
        return { x: 61, y: 92.5 }
      default:
        return { x: 0, y: 0 }
    }
  }
}

export const cubeOnEcosystemBoardLocator = new CubeOnEcosystemBoardLocator()
