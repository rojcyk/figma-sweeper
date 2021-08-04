import React, { useState, useContext } from "react"

// ******************** //
// LOCAL INCLUDES
// ******************** //

import { SectionWrapper, SectionHeader, SectionContent } from '@components/section'
import { Checkbox } from "@components/checkbox"
import { Content } from "@components/content"
import { P } from "@components/typography"
import { LinterContext } from "../linterContext"
// 
export const StylesheetView = (props: { toggle: Function }) => {
  const settings = useContext(LinterContext)

  const [general, setGeneral] = useState(false)
  const [styles, setStyles] = useState(false)

  return (
    <React.Fragment>
      <SectionWrapper expanded={general}>
        <SectionHeader expanded={general} onClick={() => general ? setGeneral(false) : setGeneral(true)}>General</SectionHeader>
        <SectionContent expanded={general}>
          <Content>

            <Checkbox
              label={'Delete hidden layers'}
              checked={settings.deleteHidden}
              onCheckboxChange={() => props.toggle('deleteHidden')}
            />

            <Checkbox
              label={'Ungroup single-layer groups'}
              checked={settings.ungroupSingleGroup}
              onCheckboxChange={() => props.toggle('ungroupSingleGroup')}
            />

            <Checkbox
              label={'Make pixel-perfect'}
              description={'Reposition elements to whole numbers.'}
              checked={settings.pixelPerfect}
              onCheckboxChange={() => props.toggle('pixelPerfect')}
            />

            <Checkbox
              label={'Skip locked layers'}
              checked={settings.skipLocked}
              onCheckboxChange={() => props.toggle('skipLocked')}
            />
            
            <Checkbox
              label={'Clear component style overrides'}
              description={'If you use components and you override thier styles (not content), these changes will be removed.'}
              checked={settings.removeStyleOverrides}
              onCheckboxChange={() => props.toggle('removeStyleOverrides')}
            />
          </Content>
        </SectionContent>
      </SectionWrapper>

      <SectionWrapper expanded={styles}>
        <SectionHeader expanded={styles} onClick={() => styles ? setStyles(false) : setStyles(true)}>Styles</SectionHeader>
        <SectionContent expanded={styles}>
          <Content>
            <P style={{ marginBottom: '12px' }}>If you use text, fill, stroke, or effect styles it is required a style to be set.</P>

            <Checkbox
              label={'Require text styles'}
              checked={settings.requireTextStyles}
              onCheckboxChange={() => props.toggle('requireTextStyles')}
            />

            <Checkbox
              label={'Require fill styles'}
              checked={settings.requireFillStyles}
              onCheckboxChange={() => props.toggle('requireFillStyles')}
            />

            <Checkbox
              label={'Require stroke styles'}
              checked={settings.requireStrokeStyles}
              onCheckboxChange={() => props.toggle('requireStrokeStyles')}
            />

            <Checkbox
              label={'Require effect styles'}
              checked={settings.requireEffectStyles}
              onCheckboxChange={() => props.toggle('requireEffectStyles')}
            />
          
          </Content>
        </SectionContent>
      </SectionWrapper>
    </React.Fragment>
  )
}
