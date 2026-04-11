import { getEnumValues } from '@gamepark/rules-api'
import { BiotopeType } from './BiotopeType'

export enum LandscapeTile {
  A1 = 1,
  A2,
  A3,
  A4,
  A5,
  A6,
  A7,
  A8,
  A9,
  A10,
  B1 = 11,
  B2,
  B3,
  B4,
  B5,
  B6,
  B7,
  B8,
  B9,
  B10
}

export const landscapeTiles = getEnumValues(LandscapeTile)

export const Mo = BiotopeType.Mountain
export const Fo = BiotopeType.Forest
export const Me = BiotopeType.Meadow
export const We = BiotopeType.Wetland
export const _ = undefined

export function getLandscape(tile: LandscapeTile) {
  switch (tile) {
    // TODO : Complete missing cases in #11
    case LandscapeTile.A1:
      return [
        [_, Fo, We],
        [Fo, Me, Me],
        [Fo, Me]
      ]
    case LandscapeTile.A2:
      return [
        [_, Me, Mo],
        [Me, Fo, Fo],
        [Me, Fo]
      ]
    case LandscapeTile.A3:
      return [
        [_, Fo, Mo],
        [Mo, Me, Mo],
        [We, Me]
      ]
    case LandscapeTile.A4:
      return [
        [_, Me, We],
        [We, Fo, We],
        [Mo, Fo]
      ]
    case LandscapeTile.A5:
      return [
        [_, Fo, Fo],
        [We, Mo, Mo],
        [We, We]
      ]
    case LandscapeTile.A6:
      return [
        [_, Me, Me],
        [Mo, We, We],
        [Mo, Mo]
      ]
    case LandscapeTile.A7:
      return [
        [_, Mo, Mo],
        [Fo, We, We],
        [Me, Me]
      ]
    case LandscapeTile.A8:
      return [
        [_, We, We],
        [Me, Mo, Mo],
        [Fo, Fo]
      ]
    case LandscapeTile.A9:
      return [
        [_, Me, Mo],
        [Mo, Mo, Fo],
        [We, Fo]
      ]
    case LandscapeTile.A10:
      return [
        [_, Fo, We],
        [We, We, Me],
        [Mo, Me]
      ]
    case LandscapeTile.B1:
      return [
        [_, Mo, Fo],
        [Mo, Fo, Fo],
        [Mo, Me]
      ]
    case LandscapeTile.B2:
      return [
        [_, We, Mo],
        [Mo, We, Fo],
        [Me, We]
      ]
    case LandscapeTile.B3:
      return [
        [_, Me, Me],
        [Me, Me, Mo],
        [Fo, Fo]
      ]
    case LandscapeTile.B4:
      return [
        [_, Fo, We],
        [We, We, Me],
        [Mo, We]
      ]
    case LandscapeTile.B5:
      return [
        [_, Mo, Mo],
        [Mo, Fo, We],
        [Fo, We]
      ]
    case LandscapeTile.B6:
      return [
        [_, Fo, Mo],
        [Me, Me, Mo],
        [Me, Me]
      ]
    case LandscapeTile.B7:
      return [
        [_, Mo, Me],
        [Fo, Me, Fo],
        [Fo, Fo]
      ]
    case LandscapeTile.B8:
      return [
        [_, Me, Me],
        [We, Me, Mo],
        [We, Mo]
      ]
    case LandscapeTile.B9:
      return [
        [_, We, Mo],
        [Mo, We, Mo],
        [We, Fo]
      ]
    case LandscapeTile.B10:
      return [
        [_, We, Mo],
        [Fo, We, We],
        [Me, Me]
      ]
  }
}
