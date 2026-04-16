import { PlayerTurnRule, PlayMoveContext } from '@gamepark/rules-api'
import { BiotopesItemMove, BiotopesMove, isBiotopesMoveItemTypeAtOnce } from '../BiotopeTypes'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { SpeciesCardId, SpeciesCardType } from '../material/SpeciesCard'
import { PlayerColor } from '../PlayerColor'
import { MaterialHelper } from './helpers/MaterialHelper'
import { PlayerHelper } from './helpers/PlayerHelper'
import { RuleId } from './RuleId'

export class GameSetupHandMulliganRule extends PlayerTurnRule<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor> {

  private readonly materialHelper = new MaterialHelper(this.game)
  private readonly playerHelper = new PlayerHelper(this.game)

  public getPlayerMoves(): BiotopesMove[] {
    const nextRule = this.playerHelper.isLastPlayer ? RuleId.GameSetupPlaceTerritoryTokens : RuleId.GameSetupHandMulligan
    return [
      this.materialHelper.playerSpeciesCardHand.moveItemsAtOnce({
        type: LocationType.SpeciesDiscardsSpot
      }),
      this.startPlayerTurn(nextRule, this.nextPlayer)
    ]
  }

  public afterItemMove(move: BiotopesItemMove, _context?: PlayMoveContext): BiotopesMove[] {
    if (isBiotopesMoveItemTypeAtOnce(MaterialType.SpeciesCard)(move) && move.location.type === LocationType.SpeciesDiscardsSpot) {
      const herbivoresDeck = this.materialHelper.herbivoresDeckMaterial.deck()
      const mountainHerbivoreIndex = herbivoresDeck
        .id<SpeciesCardId>((id) => id.back === SpeciesCardType.HerbivoreMountain)
        .limit(1)
        .getIndex()
      const forestHerbivoreIndex = herbivoresDeck
        .id<SpeciesCardId>((id) => id.back === SpeciesCardType.HerbivoreForest)
        .limit(1)
        .getIndex()
      const meadowHerbivoreIndex = herbivoresDeck
        .id<SpeciesCardId>((id) => id.back === SpeciesCardType.HerbivoreMeadow)
        .limit(1)
        .getIndex()
      const wetlandHerbivoreIndex = herbivoresDeck
        .id<SpeciesCardId>((id) => id.back === SpeciesCardType.HerbivoreWetland)
        .limit(1)
        .getIndex()
      const cardsToDealIndexes = [mountainHerbivoreIndex, forestHerbivoreIndex, meadowHerbivoreIndex, wetlandHerbivoreIndex]
      const nextRule = this.playerHelper.isLastPlayer ? RuleId.GameSetupPlaceTerritoryTokens : RuleId.GameSetupHandMulligan
      return [
        herbivoresDeck.index(cardsToDealIndexes).dealAtOnce(
          {
            type: LocationType.PlayerSpeciesCardHandSpot,
            player: this.player
          },
          4
        ),
        this.startPlayerTurn(nextRule, this.nextPlayer)
      ]
    }
    if (isBiotopesMoveItemTypeAtOnce(MaterialType.SpeciesCard)(move) && move.location.type === LocationType.PlayerSpeciesCardHandSpot) {
      return move.reveal === undefined ? [] : [this.materialHelper.herbivoresDeckMaterial.shuffle()]
    }
    return super.afterItemMove(move, _context)
  }
}
