import { MaterialType } from '@gamepark/biotopes/material/MaterialType'
import { MaterialDescription } from '@gamepark/react-game'
import { landscapeTileDescription } from './LandscapeTileDescription'
import { ecosystemBoardDescription } from './EcosystemBoardDescription'

export const Material: Partial<Record<MaterialType, MaterialDescription>> = {
  [MaterialType.LandscapeTile]: landscapeTileDescription,
  [MaterialType.EcosystemBoard]: ecosystemBoardDescription
}
