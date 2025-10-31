import { getEnumValues } from '@gamepark/rules-api'

export enum EcosystemActionType {
  Adaptation = 1,
  Reproduction,
  Transfert,
  Evolution,
  Expansion,
  Competition,
  Migration
}

export const ecosystemActionType = getEnumValues(EcosystemActionType)
