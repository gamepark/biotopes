import { PileLocator } from '@gamepark/react-game'
import { MaterialType } from '@gamepark/biotopes/material/MaterialType'

class CubeOnPlayerSpecieCardLocator extends PileLocator {
  parentItemType = MaterialType.SpeciesCard
  radius = { x: 1, y: 0.5 }
  limit = 4
  minimumDistance = 0.75

  positionOnParent = { x: 25, y: 20 }
}

export const cubeOnPlayerSpecieCardLocator = new CubeOnPlayerSpecieCardLocator()
