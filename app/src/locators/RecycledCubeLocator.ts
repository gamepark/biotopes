import { LocationType } from '@gamepark/biotopes/material/LocationType'
import { MaterialType } from '@gamepark/biotopes/material/MaterialType'
import { PlayerColor } from '@gamepark/biotopes/PlayerColor'
import { RuleId } from '@gamepark/biotopes/rules/RuleId'
import { ListLocator } from '@gamepark/react-game'

class RecycledCubeLocator extends ListLocator<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor> {}

export const recycledCubeLocator = new RecycledCubeLocator()
