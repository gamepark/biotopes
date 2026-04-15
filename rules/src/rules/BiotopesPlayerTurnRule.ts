import { PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { SpeciesDietType } from '../material/SpeciesCard'
import { Memory } from '../Memory'
import { PlayerColor } from '../PlayerColor'
import { LandscapeHelper } from './helpers/LandscapeHelper'
import { RuleId } from './RuleId'

export abstract class BiotopesPlayerTurnRule extends PlayerTurnRule<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor> {
  protected readonly landscapeHelper = new LandscapeHelper(this.game)
  protected readonly cubeMaterial = this.material(MaterialType.Cube)
  protected readonly playerCubesOnSpeciesCards = this.cubeMaterial.player(this.player).location(LocationType.CubeSpotOnPlayerSpeciesCard)
  protected readonly playerCubesOnBiotopeCards = this.cubeMaterial.player(this.player).location(LocationType.CubeSpotOnPlayerBiotopesCard)
  protected readonly reserveCubeMaterial = this.cubeMaterial.location(LocationType.CubeStockpileSpot)
  protected readonly speciesCardMaterial = this.material(MaterialType.SpeciesCard)
  protected readonly herbivoresDeckMaterial = this.speciesCardMaterial.location((l) => l.type === LocationType.SpeciesDecksSpot && l.y === SpeciesDietType.Herbivore).deck()
  protected readonly insectivoresDeckMaterial = this.speciesCardMaterial.location((l) => l.type === LocationType.SpeciesDecksSpot && l.y === SpeciesDietType.Insectivore).deck()
  protected readonly carnivoreDeckMaterial = this.speciesCardMaterial.location((l) => l.type === LocationType.SpeciesDecksSpot && l.y === SpeciesDietType.Carnivore).deck()
  protected readonly playerSpeciesCardHand = this.speciesCardMaterial.location(LocationType.PlayerSpeciesCardHandSpot).player(this.player)
  protected readonly playerSpeciesCardTableau = this.speciesCardMaterial.location(LocationType.PlayerSpeciesCardTableauSpot).player(this.player)
  protected readonly territoryTokenMaterial = this.material(MaterialType.TerritoryToken)

  protected isLastPlayer() {
    return this.nextPlayer === this.game.players[0]
  }

  get nextPlayer(): PlayerColor {
    const currentPlayerIndex = this.game.players.indexOf(this.player)
    const passedPlayers = this.remind<PlayerColor[]>(Memory.PassedPlayers) ?? []
    const players = this.game.players.slice(currentPlayerIndex + 1).concat(this.game.players.slice(0, currentPlayerIndex + 1))
    return players.find((p) => !passedPlayers.includes(p)) ?? this.player
  }
}
