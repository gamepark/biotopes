import { DropAreaDescription, ItemContext, ListLocator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location, MaterialItem } from '@gamepark/rules-api'
import { MaterialType } from '@gamepark/biotopes/material/MaterialType'
import { EcosystemActionType } from '@gamepark/biotopes/material/EcosystemActionType'
import { PlayerColor } from '@gamepark/biotopes/PlayerColor'
import { ecosystemBoardDescription } from '../material/EcosystemBoardDescription'
import { LocationType } from '@gamepark/biotopes/material/LocationType.ts'
import { BiotopeType } from '@gamepark/biotopes/material/BiotopeType.ts'
import { RuleId } from '@gamepark/biotopes/rules/RuleId.ts'
import { cubeDescription } from '../material/CubeDescription.ts'

class CubeOnEcosystemBoardLocator extends ListLocator<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor> {
  parentItemType = MaterialType.EcosystemBoard
  gap = { x: 1.21 }
  locationDescription = new CubeOnEcosystemBoardDropAreaDescription()

  getParentItem(location: Location, context: MaterialContext): MaterialItem<PlayerColor> | undefined {
    return ecosystemBoardDescription.getStaticItems(context).find((board) => board.location.player === location.player)
  }

  getMaxCount(
    location: Location<PlayerColor, LocationType, EcosystemActionType>,
    _context: MaterialContext<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>
  ): number | undefined {
    switch (location.id) {
      case EcosystemActionType.Adaptation:
        return 0
      case EcosystemActionType.Competition:
        return 2
      case EcosystemActionType.Evolution:
        return 5
      case EcosystemActionType.Expansion:
        return 2
      case EcosystemActionType.Migration:
        return 2
      case EcosystemActionType.Reproduction:
        return 1
      case EcosystemActionType.Transfert:
        return 1
    }
    return undefined
  }

  getCoordinates(location: Location<PlayerColor, LocationType>): Partial<Coordinates> {
    switch (location.id) {
      case EcosystemActionType.Reproduction:
        return { x: 1.46, y: -1.9 }
      case EcosystemActionType.Transfert:
        return { x: -3.95, y: 0.19 }
      case EcosystemActionType.Evolution:
        return { x: -3.9125, y: 3.1825 }
      case EcosystemActionType.Expansion:
        return { x: -3.75, y: 6 }
      case EcosystemActionType.Competition:
        return { x: -3.75, y: 8.075 }
      case EcosystemActionType.Migration:
        return { x: 1.375, y: 8.075 }
      default:
        return { x: 0, y: 0 }
    }
  }

  public hide(item: MaterialItem<PlayerColor, LocationType>, context: ItemContext<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>): boolean {
    return item.location.player !== (context.rules.game.view ?? context.player ?? context.rules.players[0])
  }
}

class CubeOnEcosystemBoardDropAreaDescription extends DropAreaDescription<PlayerColor, MaterialType, LocationType, BiotopeType, RuleId, PlayerColor> {
  constructor() {
    super(cubeDescription)
  }
}

export const cubeOnEcosystemBoardLocator = new CubeOnEcosystemBoardLocator()
