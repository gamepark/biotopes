import {
  MaterialGame,
  MaterialMove,
  isMoveItemType,
  isMoveItemTypeAtOnce,
  ItemMove,
  isMoveItemsAtOnce,
  isStartPlayerTurn,
  isCreateItemsAtOnce,
  isCreateItemTypeAtOnce,
  isStartRule,
  isCreateItem,
  isCreateItemType,
  isShuffle,
  isShuffleItemType,
  isShuffleRandomized
} from '@gamepark/rules-api'
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

export const isBiotopesCreateItemsAtOnce = isCreateItemsAtOnce<PlayerColor, MaterialType, LocationType>

export const isBiotopesCreateItemTypeAtOnce = isCreateItemTypeAtOnce

export const isBiotopesCreateItem = isCreateItem<PlayerColor, MaterialType, LocationType>

export const isBiotopesCreateItemType = isCreateItemType<MaterialType>

export const isBiotopesShuffle = isShuffle<PlayerColor, MaterialType, LocationType>

export const isBiotopesShuffleItemType = isShuffleItemType<MaterialType>

export const isBiotopesShuffleRandomized = isShuffleRandomized<PlayerColor, MaterialType, LocationType>

export const isBiotopesStartPlayerTurn = isStartPlayerTurn<PlayerColor, MaterialType, LocationType, RuleId>

export const isBiotopesStartRule = isStartRule<PlayerColor, MaterialType, LocationType, RuleId>
