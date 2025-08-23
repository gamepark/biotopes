/** @jsxImportSource @emotion/react */
import { BiotopesOptionsSpec } from '@gamepark/biotopes/BiotopesOptions'
import { BiotopesRules } from '@gamepark/biotopes/BiotopesRules'
import { BiotopesSetup } from '@gamepark/biotopes/BiotopesSetup'
import { GameProvider, setupTranslation } from '@gamepark/react-game'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { gameAnimations } from './animations/GameAnimations'
import { App } from './App'
import { Locators } from './locators/Locators'
import { Material, materialI18n } from './material/Material'
import translations from './translations.json'

setupTranslation(translations, { debug: false })

ReactDOM.render(
  <StrictMode>
    <GameProvider
      game="biotopes"
      Rules={BiotopesRules}
      optionsSpec={BiotopesOptionsSpec}
      GameSetup={BiotopesSetup}
      material={Material}
      locators={Locators}
      materialI18n={materialI18n}
      animations={gameAnimations}
    >
      <App />
    </GameProvider>
  </StrictMode>,
  document.getElementById('root')
)
