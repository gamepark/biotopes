import { getAdjacentHexagons, HexGridSystem, MaterialGame, MaterialRulesPart, Polyhex, XYCoordinates } from '@gamepark/rules-api'
import { getLandscape, LandscapeTile } from '../../material/LandscapeTile'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { PlayerColor } from '../../PlayerColor'
import { RuleId } from '../RuleId'
import { BiotopeType } from '../../material/BiotopeType'

export class LandscapeHelper extends MaterialRulesPart<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor> {
  landscape: Polyhex<BiotopeType>
  overlap = false

  constructor(game: MaterialGame<PlayerColor, MaterialType, LocationType>) {
    super(game)
    this.landscape = new Polyhex([], { system: HexGridSystem.Axial })
    this.material(MaterialType.LandscapeTile)
      .getItems<LandscapeTile>()
      .forEach((item) => {
        this.landscape.merge(new Polyhex(getLandscape(item.id), { system: HexGridSystem.Axial, xMin: -1, yMin: -1 }), item.location)
      })
  }

  public get gridWithCoordinates() {
    return this.landscape.grid.flatMap((yLine, yIndex) =>
      yLine.map((biotope, xIndex) => ({ biotope: biotope, x: xIndex + this.landscape.xMin, y: yIndex + this.landscape.yMin })).filter((hexTypeWithCoordinates) =>hexTypeWithCoordinates.biotope !== undefined)
    )
  }

  public getAdjacentValues(coordinates: XYCoordinates) {
    return getAdjacentHexagons(coordinates).filter((hexCoords) => this.landscape.getValue(hexCoords) !== undefined)
  }
}
