import { getEnumValues } from '@gamepark/rules-api'

export enum EnvironmentalConditionsBoardSide {
  Butterfly = 1,
  Ant
}

export const environmentalConditionsBoardSide = getEnumValues(EnvironmentalConditionsBoardSide)
