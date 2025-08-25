import { MaterialContext, PileLocator } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'
import { MaterialType } from '@gamepark/biotopes/material/MaterialType'
import { PlayerColor } from '@gamepark/biotopes/PlayerColor'
import { LocationType } from '@gamepark/biotopes/material/LocationType'

class CubeOnPlayerSpecieCardLocator extends PileLocator {
  parentItemType = MaterialType.BiotopesCard
  radius = { x: 1, y: 0.5 }
  maxCount = 4

  getParentItem(_location: Location, _context: MaterialContext): MaterialItem<PlayerColor> | undefined {
    return _context.rules
      .material(MaterialType.BiotopesCard)
      .location(LocationType.PlayerBiotopesCardSpot)
      .locationId(_location.id)
      .player(_location.player)
      .getItem()
  }

  positionOnParent = { x: 25, y: 20 }
}

export const cubeOnPlayerSpecieCardLocator = new CubeOnPlayerSpecieCardLocator()
