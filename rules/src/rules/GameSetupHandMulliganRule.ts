import { BiotopesPlayerTurnRule } from './BiotopesPlayerTurnRule'
import { PlayerColor } from '../PlayerColor'
import { MaterialType } from '../material/MaterialType'
import { LocationType } from '../material/LocationType'
import { RuleId } from './RuleId'
import { MaterialMove, PlayMoveContext } from '@gamepark/rules-api'
import { BiotopesItemMove, isBiotopesMoveItemTypeAtOnce } from '../BiotopeTypes'
import { SpecieCardId, SpecieCardType } from '../material/SpecieCard'

export class GameSetupHandMulliganRule extends BiotopesPlayerTurnRule {
  public getPlayerMoves(): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>[] {
    const nextRule = this.isLastPlayer() ? RuleId.GameSetupPlaceTerritoryTokens : RuleId.GameSetupHandMulligan
    return [
      this.material(MaterialType.SpeciesCard).location(LocationType.PlayerSpeciesCardHandSpot).player(this.player).moveItemsAtOnce({
        type: LocationType.HerbivoreDiscardSpot
      }) as MaterialMove<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>
    ].concat(this.startPlayerTurn(nextRule, this.nextPlayer))
  }

  public afterItemMove(move: BiotopesItemMove, _context?: PlayMoveContext): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>[] {
    if (isBiotopesMoveItemTypeAtOnce(MaterialType.SpeciesCard)(move) && move.location.type === LocationType.HerbivoreDiscardSpot) {
      const herbivoresDeck = this.material(MaterialType.SpeciesCard).location(LocationType.HerbivoreDeckSpot).deck()
      const mountainHerbivoreIndex = herbivoresDeck.id<SpecieCardId>((id) => id.back === SpecieCardType.HerbivoreMountain).limit(1).getIndex()
      const forestHerbivoreIndex = herbivoresDeck.id<SpecieCardId>((id) => id.back === SpecieCardType.HerbivoreForest).limit(1).getIndex()
      const meadowHerbivoreIndex = herbivoresDeck.id<SpecieCardId>((id) => id.back === SpecieCardType.HerbivoreMeadow).limit(1).getIndex()
      const wetlandHerbivoreIndex = herbivoresDeck.id<SpecieCardId>((id) => id.back === SpecieCardType.HerbivoreWetland).limit(1).getIndex()
      const cardsToDealIndexes = [mountainHerbivoreIndex, forestHerbivoreIndex, meadowHerbivoreIndex, wetlandHerbivoreIndex]
      const nextRule = this.isLastPlayer() ? RuleId.GameSetupPlaceTerritoryTokens : RuleId.GameSetupHandMulligan
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
      return move.reveal === undefined ? [] : [this.material(MaterialType.SpeciesCard).location(LocationType.HerbivoreDeckSpot).shuffle()]
    }
      return super.afterItemMove(move, _context)
  }
}
