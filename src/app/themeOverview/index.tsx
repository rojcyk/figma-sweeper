import React from "react"
import { SectionWrapper } from "../components/section"
import OverviewHeader from "./themeOverviewHeader"
import OverviewContent from "./themeOverviewContent"

// ******************** //
// LOCAL INCLUDES
// ******************** //

export default ({ styles, name, exportStyles, deleteStyles }: Plugin.ThemeOverviewI) => {
  const isSynced = name !== ""
  const [expanded, setExpanded] = React.useState(true)

  const toggleHandler = () => {
    if (expanded) setExpanded(false)
    else setExpanded(true)
  }

  return (
    <SectionWrapper
      isActive={true}
      expanded={isSynced ? expanded : true}
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
          expanded={isSynced ? expanded : true}
          showArrow={isSynced ? true : false}
          name={name}
          paintStyles={styles.paintStyles.length}
          isSynced={isSynced}
        />
      }
      buttonHandler={toggleHandler}
    />
  )
}
