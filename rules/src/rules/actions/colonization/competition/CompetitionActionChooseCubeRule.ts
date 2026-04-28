import { ItemMove, PlayerTurnRule, PlayMoveContext } from '@gamepark/rules-api'
import { PlayerColor } from '../../../../PlayerColor'
import { MaterialType } from '../../../../material/MaterialType'
import { LocationType } from '../../../../material/LocationType'
import { RuleId } from '../../../RuleId'
import { MaterialHelper } from '../../../helpers/MaterialHelper'
import { EcosystemActionType } from '../../../../material/EcosystemActionType'
import { BiotopesMove, isBiotopesMoveItemType } from '../../../../BiotopeTypes'
import { KnownSpeciesCardId } from '../../../../material/SpeciesCard'
import { speciesCardCharacteristics } from '../../../../material/SpeciesCardCharacteristics'
import { CubeType } from '../../../../material/CubeType'
import { LandscapeHelper } from '../../../helpers/LandscapeHelper'
import { uniq } from 'es-toolkit'
import { BiotopeType } from '../../../../material/BiotopeType'
import { ColonizationHelper } from '../helpers/ColonizationHelper'

export class CompetitionActionChooseCubeRule extends PlayerTurnRule<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor> {
  private readonly materialHelper = new MaterialHelper(this.game)
  private readonly landscapeHelper = new LandscapeHelper(this.game)
  private readonly colonizationHelper = new ColonizationHelper(this.game)

  public getPlayerMoves(): BiotopesMove[] {
    const reachableBiotopeTypes = this.computeReachableBiotopeTypes()
    if (reachableBiotopeTypes.length === 0) {
      return []
    }
    const mammalMoves = this.materialHelper.cubeMaterial.location(
      ({ type, player, id, x }) => type === LocationType.CubeSpotOnEcosystemBoard && id === EcosystemActionType.Competition && player === this.player && x === 0
    ).exists
      ? []
      : this.materialHelper.playerCubesOnSpeciesCards
          .parent((cardIndex) => {
            const parentCard = this.materialHelper.playerSpeciesCardTableau.index(cardIndex).getItem<KnownSpeciesCardId>()!
            return speciesCardCharacteristics[parentCard.id.front].cubeType === CubeType.Mammal
          })
          .id<BiotopeType>((id) => reachableBiotopeTypes.includes(id))
          .moveItems({
            type: LocationType.CubeSpotOnEcosystemBoard,
            player: this.player,
            id: EcosystemActionType.Competition,
            x: 0
          })
    const birdMoves = this.materialHelper.cubeMaterial.location(
      ({ type, player, id, x }) => type === LocationType.CubeSpotOnEcosystemBoard && id === EcosystemActionType.Competition && player === this.player && x === 1
    ).exists
      ? []
      : this.materialHelper.playerCubesOnSpeciesCards
          .parent((cardIndex) => {
            const parentCard = this.materialHelper.playerSpeciesCardTableau.index(cardIndex).getItem<KnownSpeciesCardId>()!
            return speciesCardCharacteristics[parentCard.id.front].cubeType === CubeType.Bird
          })
          .id<BiotopeType>((id) => reachableBiotopeTypes.includes(id))
          .moveItems({
            type: LocationType.CubeSpotOnEcosystemBoard,
            player: this.player,
            id: EcosystemActionType.Competition,
            x: 1
          })
    return mammalMoves.concat(birdMoves)
  }

  public afterItemMove(move: ItemMove<PlayerColor, MaterialType, LocationType>, _context?: PlayMoveContext): BiotopesMove[] {
    if (
      isBiotopesMoveItemType(MaterialType.Cube)(move) &&
      move.location.type === LocationType.CubeSpotOnEcosystemBoard &&
      move.location.id === EcosystemActionType.Competition &&
      move.location.player === this.player
    ) {
      const targetBiotope = this.materialHelper.cubeMaterial.index(move.itemIndex).getItem<BiotopeType>()!.id
      const nextRule = this.getNextRuleFromBiotopeType(targetBiotope)
      return [this.startRule(nextRule)]
    }
    return super.afterItemMove(move, _context)
  }

  private computeReachableBiotopeTypes() {
    return uniq(
      this.colonizationHelper
        .computeOpponentsTerritoryTokensAvailableForCompetitionMaterial()
        .getItems()
        .map((token) => this.landscapeHelper.landscape.getValue({ x: token.location.x!, y: token.location.y! }))
    )
  }

  private getNextRuleFromBiotopeType(targetBiotope: BiotopeType) {
    switch (targetBiotope) {
      case BiotopeType.Mountain:
        return RuleId.CompetitionActionMoveMountainOpponentToken
      case BiotopeType.Forest:
        return RuleId.CompetitionActionMoveForestOpponentToken
      case BiotopeType.Meadow:
        return RuleId.CompetitionActionMoveMeadowOpponentToken
      case BiotopeType.Wetland:
        return RuleId.CompetitionActionMoveWetlandOpponentToken
    }
  }
}
