import { MaterialGame, MaterialMove, isMoveItemType, isMoveItemTypeAtOnce, ItemMove, isMoveItemsAtOnce, isStartPlayerTurn } from '@gamepark/rules-api'
import { PlayerColor } from './PlayerColor'
import { MaterialType } from './material/MaterialType'
import { LocationType } from './material/LocationType'
import { RuleId } from './rules/RuleId'

export type BiotopesMove = MaterialMove<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>

export type BiotopesGame = MaterialGame<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>

export type BiotopesItemMove = ItemMove<PlayerColor, MaterialType, LocationType>

export const isBiotopesMoveItemType = isMoveItemType<MaterialType>

export const isBiotopesMoveItemAtOnce = isMoveItemsAtOnce<PlayerColor, MaterialType, LocationType>

export const isBiotopesMoveItemTypeAtOnce = isMoveItemTypeAtOnce<MaterialType>

export const isBiotopesStartPlayerTurn = isStartPlayerTurn<PlayerColor, MaterialType, LocationType, RuleId>
