import * as React from "react"
import styled from "styled-components"


// ******************** //
// Styles
// ******************** //

const ContentStyle = styled.div`
  padding: 4px 16px 16px 16px;
`

// ******************** //
// Component
// ******************** //

export const Content = (props: any) => {
  return (
    <ContentStyle {...props} />
  )
}
