import { PileLocator } from '@gamepark/react-game'
import { MaterialType } from '@gamepark/biotopes/material/MaterialType'

class CubeOnPlayerSpecieCardLocator extends PileLocator {
  parentItemType = MaterialType.BiotopesCard
  radius = { x: 1, y: 0.5 }
  maxCount = 4

  positionOnParent = { x: 25, y: 20 }
}

export const cubeOnPlayerSpecieCardLocator = new CubeOnPlayerSpecieCardLocator()
