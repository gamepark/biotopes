import { DropAreaDescription, PileLocator } from '@gamepark/react-game'
import { MaterialType } from '@gamepark/biotopes/material/MaterialType'
import { PlayerColor } from '@gamepark/biotopes/PlayerColor.ts'
import { LocationType } from '@gamepark/biotopes/material/LocationType.ts'
import { BiotopeType } from '@gamepark/biotopes/material/BiotopeType.ts'
import { RuleId } from '@gamepark/biotopes/rules/RuleId.ts'

class CubeOnPlayerSpecieCardLocator extends PileLocator {
  parentItemType = MaterialType.SpeciesCard
  radius = { x: 1, y: 0.5 }
  limit = 4
  minimumDistance = 0.75
  locationDescription = new CubeOnPlayerSpeciesCardDropAreaDescription()

  positionOnParent = { x: 25, y: 20 }
}

class CubeOnPlayerSpeciesCardDropAreaDescription extends DropAreaDescription<PlayerColor, MaterialType, LocationType, BiotopeType, RuleId, PlayerColor> {
  width = 3.5
  height = 2
  borderRadius = 2
}

export const cubeOnPlayerSpecieCardLocator = new CubeOnPlayerSpecieCardLocator()
