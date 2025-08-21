import { MaterialGameSetup, XYCoordinates } from '@gamepark/rules-api'
import { BiotopesOptions } from './BiotopesOptions'
import { BiotopesRules } from './BiotopesRules'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { PlayerColor } from './PlayerColor'
import { RuleId } from './rules/RuleId'
import { LandscapeTile } from './material/LandscapeTile'
import { EnvironmentalConditionsBoardSide } from './EnvironmentalConditionsBoardSide'
import { Memory } from './Memory'
import { sampleSize } from 'lodash'
import { biotopeEnvironmentalConditionTokens, speciesTypeEnvironmentalConditionTokens } from './material/EnvironmentalConditionToken'
import { advancedCardsByBiotope, basicBiotopeCards } from './material/BiotopeCard'
import { biotopeType } from './material/BiotopeType'
import { carnivoreCard, getSpecieCardType, herbivoreCard, insectivoreCard } from './material/SpecieCard'

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

  setupMaterial(_options: Partial<BiotopesOptions>) {
    this.memorize<EnvironmentalConditionsBoardSide>(Memory.AntSide, _options.antSide ?? EnvironmentalConditionsBoardSide.Butterfly)
    this.setupLandscape()
    this.setupTokens()
    this.setupBiotopeCards(_options.advancedBiotopes ?? false)
    this.setupRiver()
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

  setupTokens() {
    this.material(MaterialType.InitiativeToken).createItem({
      location: { type: LocationType.PlayerInitiativeTokenSpot, player: this.players[0] }
    })
    this.material(MaterialType.CycleToken).createItem({
      location: { type: LocationType.CycleTokenSpotOnEnviromnentalConditionsBoard, x: 1 }
    })
    this.material(MaterialType.EnvironmentalConditionToken).createItems(
      sampleSize(biotopeEnvironmentalConditionTokens, 2)
        .concat(sampleSize(speciesTypeEnvironmentalConditionTokens, 2))
        .map((id) => ({
          id: id,
          location: { type: LocationType.EnvironmentalConditionTokenSpotOnEnviromnentalConditionsBoard }
        }))
    )
  }

  setupBiotopeCards(advancedBiotopes: boolean) {
    if (advancedBiotopes) {
      this.material(MaterialType.BiotopesCard).createItems(
        biotopeType.flatMap((biotope) =>
          advancedCardsByBiotope[biotope].map((card) => ({
            id: card,
            location: { type: LocationType.AdvancedBiotopesSelectionSpot, id: biotope }
          }))
        )
      )
    } else {
      this.material(MaterialType.BiotopesCard).createItems(
        this.rules.players.flatMap((player) =>
          basicBiotopeCards.map((card, index) => ({
            id: card,
            location: { type: LocationType.PlayerBiotopesCardSpot, player: player, y: index + 1 }
          }))
        )
      )
    }
  }

  setupRiver() {
    this.material(MaterialType.SpeciesCard).createItemsAtOnce(
      herbivoreCard.map((card) => ({
        id: { front: card, back: getSpecieCardType(card) },
        location: { type: LocationType.HerbivoreDeckSpot }
      }))
    )
    this.material(MaterialType.SpeciesCard).location(LocationType.HerbivoreDeckSpot).deck().shuffle()
    this.material(MaterialType.SpeciesCard).createItemsAtOnce(
      insectivoreCard.map((card) => ({
        id: { front: card, back: getSpecieCardType(card) },
        location: { type: LocationType.InsectivoreDeckSpot }
      }))
    )
    this.material(MaterialType.SpeciesCard).location(LocationType.InsectivoreDeckSpot).deck().shuffle()
    this.material(MaterialType.SpeciesCard).createItemsAtOnce(
      carnivoreCard.map((card) => ({
        id: { front: card, back: getSpecieCardType(card) },
        location: { type: LocationType.CarnivoreDeckSpot }
      }))
    )
    this.material(MaterialType.SpeciesCard).location(LocationType.CarnivoreDeckSpot).deck().shuffle()
  }
}
