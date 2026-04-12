import { BiotopesPlayerTurnRule } from '../../BiotopesPlayerTurnRule'
import { ItemMove, PlayMoveContext } from '@gamepark/rules-api'
import { PlayerColor } from '../../../PlayerColor'
import { MaterialType } from '../../../material/MaterialType'
import { LocationType } from '../../../material/LocationType'
import { EcosystemActionType } from '../../../material/EcosystemActionType'
import { BiotopesMove, isBiotopesMoveItemType } from '../../../BiotopeTypes'
import { BiotopeType } from '../../../material/BiotopeType'
import { RuleId } from '../../RuleId'

export class ExpansionActionChooseCubeRule extends BiotopesPlayerTurnRule {
  public getPlayerMoves(): BiotopesMove[] {
    const biotopeCubeMoves: BiotopesMove[] = this.material(MaterialType.Cube)
      .location(LocationType.CubeSpotOnPlayerBiotopesCard)
      .player(this.player)
      .moveItems({
        type: LocationType.CubeSpotOnEcosystemBoard,
        player: this.player,
        id: EcosystemActionType.Expansion
      })
    const insectCubeMoves: BiotopesMove[] = []
    const pollinatingSpeciesCubesMoves: BiotopesMove[] = []
    return biotopeCubeMoves.concat(insectCubeMoves).concat(pollinatingSpeciesCubesMoves)
  }

  public afterItemMove(_move: ItemMove<PlayerColor, MaterialType, LocationType>, _context?: PlayMoveContext): BiotopesMove[] {
    if (isBiotopesMoveItemType(MaterialType.Cube)(_move)) {
      const biotopeToExpandTo = this.material(MaterialType.Cube).index(_move.itemIndex).getItem<BiotopeType>()!.id
      const nextRule = this.getRuleFromBiotope(biotopeToExpandTo)
      return [this.startRule(nextRule)]
    }
    return super.afterItemMove(_move, _context)
  }

  private getRuleFromBiotope(biotopeToExpandTo: BiotopeType) {
    switch (biotopeToExpandTo) {
      case BiotopeType.Mountain:
        return RuleId.ExpansionPlaceTokenOnMountain
      case BiotopeType.Forest:
        return RuleId.ExpansionPlaceTokenOnForest
      case BiotopeType.Meadow:
        return RuleId.ExpansionPlaceTokenOnMeadow
      case BiotopeType.Wetland:
        return RuleId.ExpansionPlaceTokenOnWetland
    }
  }
}
