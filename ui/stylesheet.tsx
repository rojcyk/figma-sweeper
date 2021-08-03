import React, { useState } from "react"
import styled from "styled-components"

// ******************** //
// LOCAL INCLUDES
// ******************** //

// import {
//   FS_DEFAULT,
//   FS_LARGE,
//   FS_SMALL,
//   BLACK,
//   WHITE,
//   BLUE,
//   BACKGROUND,
//   SEPARATOR,
//   ANIMATION_SPEED_MS } from "@ui"

import { Arrow } from "@icons/arrow"
import { ButtonPrimary, ButtonSecondary, ButtonDisabled } from "@components/button"
import { Checkbox } from "@components/checkbox"
import { H1, H2, H3, P } from "@components/typography"
import { Content } from "@components/content"
import { SectionWrapper, SectionHeader, SectionContent } from '@components/section'

const Wrapper = styled.div`
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 16px;

  & > * {
    margin-bottom: 8px;
  }
`

export const StylesheetView = () => {
  const [expanded, setExpanded] = useState(false)
  const [expandedB, setExpandedB] = useState(false)


  return (
    <React.Fragment>
      <Wrapper>
        <H1>Headline 1</H1>
        <H2>Headline 2</H2>
        <H3>Headline 3</H3>

        <ButtonPrimary icon={<Arrow />} label='Primary button' onClick={() => {}} />
        <ButtonSecondary icon={<Arrow />} label='Secondary button' onClick={() => {}} />
        <ButtonDisabled icon={<Arrow />} label='Secondary button' onClick={() => {}} />

        <P>Something something something else.</P>
      </Wrapper>

      <SectionWrapper expanded={expanded}>
        <SectionHeader expanded={expanded} onClick={() => expanded ? setExpanded(false) : setExpanded(true)}>General</SectionHeader>
        <SectionContent expanded={expanded}>
          <Content>
            <Checkbox checked={true} onCheckboxChange={()=>{}}>Delete hidden layers</Checkbox>
            <Checkbox checked={true} onCheckboxChange={()=>{}}>Ungroup single-layer groups</Checkbox>
            <Checkbox checked={false} onCheckboxChange={()=>{}}>Make pixel-perfect</Checkbox>
            <Checkbox checked={true} onCheckboxChange={()=>{}}>Skip locked layers</Checkbox>
            <Checkbox checked={false} onCheckboxChange={()=>{}}>Clear component style overrides</Checkbox>
          </Content>
        </SectionContent>
      </SectionWrapper>

      <SectionWrapper expanded={expandedB}>
        <SectionHeader expanded={expandedB} onClick={() => expandedB ? setExpandedB(false) : setExpandedB(true)}>Style rules</SectionHeader>
        <SectionContent expanded={expandedB}>
          <Content>
            <Checkbox checked={true} onCheckboxChange={()=>{}}>Require fill styles</Checkbox>
            <Checkbox checked={true} onCheckboxChange={()=>{}}>Require stroke styles</Checkbox>
            <Checkbox checked={true} onCheckboxChange={()=>{}}>Require effects styles</Checkbox>
          </Content>
        </SectionContent>
      </SectionWrapper>
    </React.Fragment>
  )
}