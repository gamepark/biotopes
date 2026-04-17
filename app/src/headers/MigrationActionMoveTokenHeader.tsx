import { BiotopeType } from '@gamepark/biotopes/material/BiotopeType.ts'
import { HeaderText } from '@gamepark/react-game'
import { camelCase } from 'es-toolkit'
import { FC } from 'react'
import { Trans } from 'react-i18next'

export const MigrationActionMoveTokenHeader: (type: BiotopeType) => FC = (type) => () => <HeaderText code="migrationAction.moveTerritoryToken" components={{
  biotope: <Trans i18nKey={`biotope.${camelCase(BiotopeType[type])}`}/>
}}/>