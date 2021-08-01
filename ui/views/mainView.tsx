import * as React from "react"

// ******************** //
// LOCAL INCLUDES
// ******************** //

import Styles from "../styles"
import Colors from "../colors"
import Fonts from "../fonts"
import LinterButton from "../lint/index"
import { Footer } from "../footer"

export const MainView = ({
  isSynced,
  openedState,
  settings,
  toogleSection
}: {
  isSynced: boolean,
  openedState: Plugin.OpenedState,
  settings: Plugin.Settings,
  toogleSection: Function
}) => 
  <React.Fragment>
    {/* <Styles
      isSynced={isSynced}
      expanded={openedState.styles}
      toggleHandler={toogleSection}
    />

    <Colors
      settings={settings.color}
      isSynced={isSynced}
      expanded={openedState.colors}
      toggleHandler={toogleSection}
    />

    <Fonts
      settings={settings.text}
      isSynced={isSynced}
      expanded={openedState.fonts}
      toggleHandler={toogleSection}
    /> */}

    <LinterButton isActive={isSynced} />

    <Footer />
  </React.Fragment>