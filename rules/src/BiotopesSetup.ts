import { MaterialGameSetup, XYCoordinates } from '@gamepark/rules-api'
import { BiotopesOptions } from './BiotopesOptions'
import { BiotopesRules } from './BiotopesRules'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { PlayerColor } from './PlayerColor'
import { RuleId } from './rules/RuleId'
import { LandscapeTile } from './material/LandscapeTile'

const landscapeSetupCoordinate: Record<number, (XYCoordinates & { rotation?: number } & { id?: LandscapeTile })[]> = {
  2: [
    { x: -2, y: -1, rotation: 0, id: LandscapeTile.A1 },
    { x: 1, y: -2, rotation: 1, id: LandscapeTile.A2 },
    { x: -1, y: 1, rotation: 3, id: LandscapeTile.A3 },
    { x: 2, y: 0, rotation: 1, id: LandscapeTile.A4 }
  ],
  3: [
    { x: -3, y: -1 },
    { x: 0, y: -2 },
    { x: 3, y: -3 },
    { x: -2, y: 1 },
    { x: 1, y: 0 },
    { x: -1, y: 3 }
  ],
  4: [
    { x: 0, y: -3 },
    { x: -2, y: 0 },
    { x: 1, y: -1 },
    { x: 4, y: -2 },
    { x: -4, y: 3 },
    { x: -1, y: 2 },
    { x: 2, y: 1 },
    { x: 0, y: 4 }
  ],
  5: [
    { x: 0, y: -3 },
    { x: 3, y: -4 },
    { x: -2, y: 0 },
    { x: 1, y: -1 },
    { x: 4, y: -2 },
    { x: -4, y: 3 },
    { x: -1, y: 2 },
    { x: 2, y: 1 },
    { x: -3, y: 5 },
    { x: 0, y: 4 }
  ]
}

/**
 * This class creates a new Game based on the game options
 */
export class BiotopesSetup extends MaterialGameSetup<PlayerColor, MaterialType, LocationType, BiotopesOptions> {
  Rules = BiotopesRules

  setupMaterial(_options: BiotopesOptions) {
    this.setupLandscape()
    this.setupInitiativeToken()
  }

  start() {
    this.startPlayerTurn(RuleId.TheFirstStep, this.players[0])
  }

  setupLandscape() {
    landscapeSetupCoordinate[this.rules.players.length].forEach((value) => {
      const { x, y, rotation, id } = value
      this.material(MaterialType.LandscapeTile).createItem({
        id: id ?? 1,
        location: { type: LocationType.CentralLandscapeSpot, x: x, y: y, rotation: rotation ?? 0 }
      })
    })
  }

  setupInitiativeToken() {
    this.material(MaterialType.InitiativeToken).createItem({
      location: { type: LocationType.PlayerInitiativeTokenSpot, player: this.players[0] }
    })
  }
}
