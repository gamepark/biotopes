import { LocationType } from '@gamepark/biotopes/material/LocationType'
import { MaterialType } from '@gamepark/biotopes/material/MaterialType'
import { PlayerColor } from '@gamepark/biotopes/PlayerColor'
import { FlatMaterialDescription } from '@gamepark/react-game'
import MountainCube from '../images/Cubes/MountainCube.png'
import ForestCube from '../images/Cubes/ForestCube.png'
import MeadowCube from '../images/Cubes/MeadowCube.png'
import WetlandCube from '../images/Cubes/WetlandCube.png'
import { BiotopeType } from '@gamepark/biotopes/material/BiotopeType'

class CubeDescription extends FlatMaterialDescription<PlayerColor, MaterialType, LocationType> {
  width = 0.8
  height = 0.98

  images = {
    [BiotopeType.Mountain]: MountainCube,
    [BiotopeType.Forest]: ForestCube,
    [BiotopeType.Meadow]: MeadowCube,
    [BiotopeType.Wetland]: WetlandCube
  }
}

export const cubeDescription = new CubeDescription()
