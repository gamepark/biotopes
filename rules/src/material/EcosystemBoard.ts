import { getEnumValues } from '@gamepark/rules-api'

export enum EcosystemBoard {
  Fox = 1,
  Ibex,
  Owl,
  Salamander,
  Woodpecker
}

export const ecosystemBoard = getEnumValues(EcosystemBoard)
