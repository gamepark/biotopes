import { biotopeType, BiotopeType } from '@gamepark/biotopes/material/BiotopeType'
import { LocationType } from '@gamepark/biotopes/material/LocationType'
import { MaterialType } from '@gamepark/biotopes/material/MaterialType'
import { PlayerColor } from '@gamepark/biotopes/PlayerColor'
import { RuleId } from '@gamepark/biotopes/rules/RuleId.ts'
import { FlatMaterialDescription } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'
import ForestCube from '../images/Cubes/ForestCube.svg?url'
import MeadowCube from '../images/Cubes/MeadowCube.svg?url'
import MountainCube from '../images/Cubes/MountainCube.svg?url'
import WetlandCube from '../images/Cubes/WetlandCube.svg?url'

class CubeDescription extends FlatMaterialDescription<PlayerColor, MaterialType, LocationType, BiotopeType, RuleId, PlayerColor> {
  width = 0.8
  height = 0.98

  images = {
    [BiotopeType.Mountain]: MountainCube,
    [BiotopeType.Forest]: ForestCube,
    [BiotopeType.Meadow]: MeadowCube,
    [BiotopeType.Wetland]: WetlandCube
  }

  transparency = true

  public getStockLocation(item: MaterialItem<PlayerColor, LocationType, BiotopeType>): Location<PlayerColor, LocationType> | undefined {
    return {
      type: LocationType.CubeStockpileSpot,
      id: item.id
    }
  }

  public getStaticItems(): MaterialItem<PlayerColor, LocationType, BiotopeType>[] {
    return biotopeType.map((type) => ({ id: type, quantity: 40, location: { type: LocationType.CubeStockpileSpot, id: type } }))
  }
}

export const cubeDescription = new CubeDescription()
