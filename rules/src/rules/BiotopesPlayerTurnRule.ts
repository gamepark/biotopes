import { PlayerTurnRule } from '@gamepark/rules-api'
import { PlayerColor } from '../PlayerColor'
import { MaterialType } from '../material/MaterialType'
import { LocationType } from '../material/LocationType'
import { RuleId } from './RuleId'
import { LandscapeHelper } from './helpers/LandscapeHelper'

export abstract class BiotopesPlayerTurnRule extends PlayerTurnRule<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor> {
  protected readonly landscapeHelper = new LandscapeHelper(this.game)
  protected readonly cubeMaterial = this.material(MaterialType.Cube)
  protected readonly playerCubesOnSpeciesCards = this.cubeMaterial.player(this.player).location(LocationType.CubeSpotOnPlayerSpeciesCard)
  protected readonly playerCubesOnBiotopeCards = this.cubeMaterial.player(this.player).location(LocationType.CubeSpotOnPlayerBiotopesCard)
  protected readonly reserveCubeMaterial = this.cubeMaterial.location(LocationType.CubeStockpileSpot)
  protected readonly speciesCardMaterial = this.material(MaterialType.SpeciesCard)
  protected readonly playerSpeciesCardHand = this.speciesCardMaterial.location(LocationType.PlayerSpeciesCardHandSpot).player(this.player)
  protected readonly playerSpeciesCardTableau = this.speciesCardMaterial.location(LocationType.PlayerSpeciesCardTableauSpot).player(this.player)
  protected readonly territoryTokenMaterial = this.material(MaterialType.TerritoryToken)

  protected isLastPlayer() {
    return this.nextPlayer === this.game.players[0]
  }
}
