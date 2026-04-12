import { ExpansionActionPlaceTerritoryTokenRule } from './ExpansionActionPlaceTerritoryTokenRule'
import { BiotopeType } from '../../../material/BiotopeType'

export class ExpansionActionPlaceTerritoryTokenOnWetlandRule extends ExpansionActionPlaceTerritoryTokenRule {
  biotopeToExpandTo = BiotopeType.Wetland
}
