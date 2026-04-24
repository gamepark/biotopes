import { PlayerTurnRule, PlayMoveContext, RuleMove, RuleStep } from '@gamepark/rules-api'
import { PlayerColor } from '../../../PlayerColor'
import { MaterialType } from '../../../material/MaterialType'
import { LocationType } from '../../../material/LocationType'
import { RuleId } from '../../RuleId'
import { countBy } from 'es-toolkit'
import { KnownSpeciesCardId, SpeciesDietType } from '../../../material/SpeciesCard'
import { BiotopesMove } from '../../../BiotopeTypes'
import { MaterialHelper } from '../../helpers/MaterialHelper'
import { PlayerHelper } from '../../helpers/PlayerHelper'

export class EndOfActionReplenishRiversAndActivateNextPlayerRule extends PlayerTurnRule<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor> {
  private readonly materialHelper = new MaterialHelper(this.game)
  private readonly playerHelper = new PlayerHelper(this.game)

  public onRuleStart(_move: RuleMove<PlayerColor, RuleId>, _previousRule?: RuleStep, _context?: PlayMoveContext): BiotopesMove[] {
    const riverMaterial = this.materialHelper.speciesCardMaterial.location(LocationType.SpeciesRiversGrid)
    const ruleChangeConsequences = [
      this.startPlayerTurn(this.playerHelper.nextPlayer === this.player ? RuleId.EndOfCycle : RuleId.ChooseAction, this.playerHelper.nextPlayer)
    ]
    if (riverMaterial.getQuantity() < 9) {
      const riverCounts = countBy(riverMaterial.getItems<KnownSpeciesCardId>(), (card) => card.location.y as SpeciesDietType)
      const indexesToDraw: number[] = this.materialHelper.herbivoresDeckMaterial
        .limit(3 - (riverCounts[SpeciesDietType.Herbivore] ?? 0))
        .getIndexes()
        .concat(this.materialHelper.insectivoresDeckMaterial.limit(3 - (riverCounts[SpeciesDietType.Insectivore] ?? 0)).getIndexes())
        .concat(this.materialHelper.carnivoreDeckMaterial.limit(3 - (riverCounts[SpeciesDietType.Carnivore] ?? 0)).getIndexes())
      return [
        this.materialHelper.speciesCardMaterial
          .index(indexesToDraw)
          .deck()
          .dealAtOnce({ type: LocationType.SpeciesRiversGrid }, indexesToDraw.length) as BiotopesMove
      ].concat(ruleChangeConsequences)
    }
    return ruleChangeConsequences
  }
}
