import { BiotopeType } from '@gamepark/biotopes/material/BiotopeType.ts'
import { FC } from 'react'
import { HeaderText } from '@gamepark/react-game'
import { Trans } from 'react-i18next'
import { camelCase } from 'es-toolkit'

export const ExpansionActionPlaceTokenHeader: (type: BiotopeType) => FC = (type) => () => (
  <HeaderText code="expansionAction.placeToken" components={{ biotope: <Trans i18nKey={`biotope.${camelCase(BiotopeType[type])}`} /> }} />
)
