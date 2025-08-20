import { HexGridSystem, MaterialGame, MaterialRulesPart, Polyhex } from '@gamepark/rules-api'
import { MaterialType } from '../../material/MaterialType'
import { getLandscape, LandscapeTile } from '../../material/LandscapeTile'
import { LocationType } from '../../material/LocationType'
import { PlayerColor } from '../../PlayerColor'

export class LandscapeHelper extends MaterialRulesPart {
  landscape: Polyhex<LandscapeTile>
  overlap = false

  constructor(game: MaterialGame<PlayerColor, MaterialType, LocationType>) {
    super(game)
    this.landscape = new Polyhex([], { system: HexGridSystem.Axial })
    this.material(MaterialType.LandscapeTile)
      .getItems<LandscapeTile>()
      .forEach((item) => this.landscape.merge(getLandscape(item.id), item.location))
  }
}
