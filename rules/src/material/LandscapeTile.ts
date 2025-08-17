import { getEnumValues } from '@gamepark/rules-api'
import { Biotope } from './Biotope'

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
  B10,
  C1 = 21,
  C2,
  D1 = 31,
  D2
}

export const landscapeTiles = getEnumValues(LandscapeTile)

export const Mo = Biotope.Mountain
export const Fo = Biotope.Forest
export const Me = Biotope.Meadow
export const We = Biotope.Wetland
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
    default:
      return [
        [_, 1, 1],
        [1, 1, 1],
        [1, 1]
      ]
  }
}
