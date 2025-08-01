import { MaterialGameSetup, XYCoordinates } from '@gamepark/rules-api'
import { BiotopesOptions } from './BiotopesOptions'
import { BiotopesRules } from './BiotopesRules'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { PlayerColor } from './PlayerColor'
import { RuleId } from './rules/RuleId'

const polyHexCoordinates: Record<number, XYCoordinates[]> = {
  2: [{ x: -2, y: -1 }, { x: 1, y: -2 }, { x: -1, y: 1 }, { x: 0, y: 2 }],
  3: [{ x: -3, y: -1 }, { x: 0, y: -2 }, { x: 3, y: -3 }, { x: -2, y: 1}, { x: 1, y: 0 }, { x: -1, y: 3 }],
  4: [{ x: 0, y: -3 }, { x: -2, y: 0 }, { x: 1, y: -1 }, { x: 4, y: -2 }, { x: -4, y: 3 }, { x: -1, y: 2 }, { x: 2, y: 1 }, { x: 0, y: 4 }],
  5: [{ x: 0, y: -3 }, { x: 3, y: -4 }, { x: -2, y: 0 }, { x: 1, y: -1 }, { x: 4, y: -2 }, { x: -4, y: 3 }, { x: -1, y: 2}, { x: 2, y: 1 }, { x: -3, y: 5 }, { x: 0, y: 4 }],
}

/**
 * This class creates a new Game based on the game options
 */
export class BiotopesSetup extends MaterialGameSetup<PlayerColor, MaterialType, LocationType, BiotopesOptions> {
  Rules = BiotopesRules

  setupMaterial(_options: BiotopesOptions) {
    // TODO
  }

  start() {
    this.startPlayerTurn(RuleId.TheFirstStep, this.players[0])
  }
}
