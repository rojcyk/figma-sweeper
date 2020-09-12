import React from "react"
import { SectionWrapper } from "../components/section"
import OverviewHeader from "./themeOverviewHeader"
import OverviewContent from "./themeOverviewContent"

// ******************** //
// LOCAL INCLUDES
// ******************** //

export default ({
  styles,
  name,
  exportStyles,
  deleteStyles,
  expanded,
  toggleHandler
}: Plugin.ThemeOverviewI) => {
  const isSynced = name !== ""

  return (
    <SectionWrapper
      isActive={true}
      expanded={expanded}
      content={
        <OverviewContent
          exportStyles={exportStyles}
          deleteStyles={deleteStyles}
          name={name}
          paintStyles={styles.paintStyles.length}
          isSynced={isSynced}
        />
      }
      button={
        <OverviewHeader
          expanded={expanded}
          showArrow={isSynced ? true : false}
          name={name}
          paintStyles={styles.paintStyles.length}
          isSynced={isSynced}
        />
      }
      buttonHandler={() => toggleHandler("styles")}
    />
  )
}
