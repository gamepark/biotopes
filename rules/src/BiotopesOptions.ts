import { TFunction } from 'i18next'
import { getEnumValues, OptionsSpec } from '@gamepark/rules-api'
import { PlayerColor } from './PlayerColor'
import { environmentalConditionsBoardSide, EnvironmentalConditionsBoardSide } from './EnvironmentalConditionsBoardSide'

/**
 * This is the options for each player in the game.
 */
type PlayerOptions = { id: PlayerColor }

/**
 * This is the type of object that the game receives when a new game is started.
 * The first generic parameter, "{}", can be changed to include game options like variants or expansions.
 */
export type BiotopesOptions = {
  players: PlayerOptions[]
  antSide: EnvironmentalConditionsBoardSide
  advancedBiotopes: boolean
}

/**
 * This object describes all the options a game can have, and will be used by GamePark website to create automatically forms for you game
 * (forms for friendly games, or forms for matchmaking preferences, for instance).
 */
export const BiotopesOptionsSpec: OptionsSpec<BiotopesOptions> = {
  players: {
    id: {
      label: (t) => t('player.id'),
      values: getEnumValues(PlayerColor),
      valueSpec: (id) => ({ label: (t) => t(`player.${id}`) })
    }
  },
  antSide: {
    label: (t: TFunction) => t('option.environmentalConditions.antSide'),
    help: (t: TFunction) => t('option.environmentalConditions.antSide.help'),
    values: environmentalConditionsBoardSide,
    valueSpec: (side) => ({ label: (t) => getEnvironmentalConditionsBoardSide(side, t) })
  },
  advancedBiotopes: {
    label: (t: TFunction) => t('option.advancedBioptopes'),
    help: (t: TFunction) => t('option.advancedBioptopes.help')
  }
}

export function getEnvironmentalConditionsBoardSide(side: EnvironmentalConditionsBoardSide, t: TFunction) {
  switch (side) {
    case EnvironmentalConditionsBoardSide.Butterfly:
      return t('Butterfly')
    case EnvironmentalConditionsBoardSide.Ant:
      return t('Ant')
  }
}
