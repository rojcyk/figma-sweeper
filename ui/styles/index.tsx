import React from "react"

// ******************** //
// LOCAL INCLUDES
// ******************** //

import { SectionWrapper } from "../components/section"
import StylesHeader from "./stylesHeader"
import StylesContent from "./stylesContent"

// ******************** //
// Component
// ******************** //

export default ({ expanded, toggleHandler, isSynced }: Plugin.ThemeOverviewI) => {
  return (
    <SectionWrapper
      isActive={true}
      expanded={expanded}
      content={<StylesContent />}
      header={<StylesHeader expanded={expanded} showArrow={isSynced ? true : false} />}
      toggleHandler={() => {
        if (isSynced) toggleHandler("styles")
      }}
    />
  )
}
