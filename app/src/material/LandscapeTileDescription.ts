import { LocationType } from '@gamepark/biotopes/material/LocationType'
import { MaterialType } from '@gamepark/biotopes/material/MaterialType'
import { PlayerColor } from '@gamepark/biotopes/PlayerColor'
import { LandscapeTile } from '@gamepark/biotopes/material/LandscapeTile'
import A1 from '../images/Hexes/Hexes-A1.png'
import A2 from '../images/Hexes/Hexes-A2.png'
import A3 from '../images/Hexes/Hexes-A3.png'
import A4 from '../images/Hexes/Hexes-A4.png'
import A5 from '../images/Hexes/Hexes-A5.png'
import A6 from '../images/Hexes/Hexes-A6.png'
import A7 from '../images/Hexes/Hexes-A7.png'
import A8 from '../images/Hexes/Hexes-A8.png'
import A9 from '../images/Hexes/Hexes-A9.png'
import A10 from '../images/Hexes/Hexes-A10.png'
import B1 from '../images/Hexes/Hexes-B1.png'
import B2 from '../images/Hexes/Hexes-B2.png'
import B3 from '../images/Hexes/Hexes-B3.png'
import B4 from '../images/Hexes/Hexes-B4.png'
import B5 from '../images/Hexes/Hexes-B5.png'
import B6 from '../images/Hexes/Hexes-B6.png'
import B7 from '../images/Hexes/Hexes-B7.png'
import B8 from '../images/Hexes/Hexes-B8.png'
import B9 from '../images/Hexes/Hexes-B9.png'
import B10 from '../images/Hexes/Hexes-B10.png'
import C1 from '../images/Hexes/Hexes-C1.png'
import C2 from '../images/Hexes/Hexes-C2.png'
import D1 from '../images/Hexes/Hexes-D1.png'
import D2 from '../images/Hexes/Hexes-D2.png'
import { PolyhexDescription } from '@gamepark/react-game'
import { HexGridSystem, Polyhex } from '@gamepark/rules-api'

class LandscapeTileDescription extends PolyhexDescription<PlayerColor, MaterialType, LocationType, LandscapeTile> {
  height = 9
  width = 8.78
  transparency = true
  polyhex = new Polyhex(
    [
      [undefined, 1, 1],
      [1, 1, 1],
      [1, 1]
    ],
    { system: HexGridSystem.Axial, xMin: -1, yMin: -1 }
  )

  images = {
    [LandscapeTile.A1]: A1,
    [LandscapeTile.A2]: A2,
    [LandscapeTile.A3]: A3,
    [LandscapeTile.A4]: A4,
    [LandscapeTile.A5]: A5,
    [LandscapeTile.A6]: A6,
    [LandscapeTile.A7]: A7,
    [LandscapeTile.A8]: A8,
    [LandscapeTile.A9]: A9,
    [LandscapeTile.A10]: A10,
    [LandscapeTile.B1]: B1,
    [LandscapeTile.B2]: B2,
    [LandscapeTile.B3]: B3,
    [LandscapeTile.B4]: B4,
    [LandscapeTile.B5]: B5,
    [LandscapeTile.B6]: B6,
    [LandscapeTile.B7]: B7,
    [LandscapeTile.B8]: B8,
    [LandscapeTile.B9]: B9,
    [LandscapeTile.B10]: B10,
    [LandscapeTile.C1]: C1,
    [LandscapeTile.C2]: C2,
    [LandscapeTile.D1]: D1,
    [LandscapeTile.D2]: D2
  }
}

export const landscapeTileDescription = new LandscapeTileDescription()
