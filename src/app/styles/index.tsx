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

export default ({
  styles,
  name,
  exportStyles,
  deleteStyles,
  expanded,
  toggleHandler,
  isSynced
}: Plugin.ThemeOverviewI) => {
  return (
    <SectionWrapper
      isActive={true}
      expanded={expanded}
      content={
        <StylesContent
          exportStyles={exportStyles}
          deleteStyles={deleteStyles}
          name={name}
          paintStyles={styles.paintStyles.length}
          isSynced={isSynced}
        />
      }
      header={
        <StylesHeader
          expanded={expanded}
          showArrow={isSynced ? true : false}
          name={name}
          paintStyles={styles.paintStyles.length}
          isSynced={isSynced}
        />
      }
      toggleHandler={() => {
        if (isSynced) toggleHandler("styles")
      }}
    />
  )
}
