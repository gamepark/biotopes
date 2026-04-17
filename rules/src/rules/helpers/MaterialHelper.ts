import { MaterialRulesPart } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { SpeciesDietType } from '../../material/SpeciesCard'
import { PlayerColor } from '../../PlayerColor'
import { RuleId } from '../RuleId'
import { PlayerHelper } from './PlayerHelper'

export class MaterialHelper extends MaterialRulesPart<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor> {
  private readonly playerHelper = new PlayerHelper(this.game)

  public get cubeMaterial() {
    return this.material(MaterialType.Cube)
  }

  public get playerCubesOnSpeciesCards() {
    return this.cubeMaterial.player(this.playerHelper.player).location(LocationType.CubeSpotOnPlayerSpeciesCard)
  }

  public get playerCubesOnBiotopeCards() {
    return this.cubeMaterial.player(this.playerHelper.player).location(LocationType.CubeSpotOnPlayerBiotopesCard)
  }

  public get reserveCubeMaterial() {
    return this.cubeMaterial.location(LocationType.CubeStockpileSpot)
  }

  public get speciesCardMaterial() {
    return this.material(MaterialType.SpeciesCard)
  }

  public get herbivoresDeckMaterial() {
    return this.speciesCardMaterial.location((l) => l.type === LocationType.SpeciesDecksSpot && l.y === SpeciesDietType.Herbivore).deck()
  }

  public get insectivoresDeckMaterial() {
    return this.speciesCardMaterial.location((l) => l.type === LocationType.SpeciesDecksSpot && l.y === SpeciesDietType.Insectivore).deck()
  }

  public get carnivoreDeckMaterial() {
    return this.speciesCardMaterial.location((l) => l.type === LocationType.SpeciesDecksSpot && l.y === SpeciesDietType.Carnivore).deck()
  }

  public get playerSpeciesCardHand() {
    return this.speciesCardMaterial.location(LocationType.PlayerSpeciesCardHandSpot).player(this.playerHelper.player)
  }

  public get playerSpeciesCardTableau() {
    return this.speciesCardMaterial.location(LocationType.PlayerSpeciesCardTableauSpot).player(this.playerHelper.player)
  }

  public get territoryTokenMaterial() {
    return this.material(MaterialType.TerritoryToken)
  }

  public get centralLandscapeTerritoryTokenMaterial() {
    return this.territoryTokenMaterial.location(LocationType.CentralLandscapeSpot)
  }

  public get playerTerritoryToken() {
    return this.territoryTokenMaterial.id(this.playerHelper.player)
  }

  public get playerTerritoryTokenOnCentralLandscape() {
    return this.playerTerritoryToken.location(LocationType.CentralLandscapeSpot)
  }

  public get availablePlayerTerritoryToken() {
    return this.playerTerritoryToken.location(LocationType.TerritoryTokenSpotOnEcosystemBoard)
  }

  public get otherPlayersTerritoryTokens() {
    return this.territoryTokenMaterial.id((player) => player !== this.playerHelper.player)
  }

  public get otherPlayersTerritoryTokensOnCentralLandscape() {
    return this.otherPlayersTerritoryTokens.location(LocationType.CentralLandscapeSpot)
  }
}
