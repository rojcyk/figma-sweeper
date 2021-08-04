import React, { useState, useContext } from "react"
import io from 'figmaio/ui'

// ******************** //
// LOCAL INCLUDES
// ******************** //

import { SectionWrapper, SectionHeader, SectionContent } from '@components/section'
import { Checkbox } from "@components/checkbox"
import { Content } from "@components/content"
import { P } from "@components/typography"
import { LinterContext } from "../linterContext"
import { OPEN_STATE_UPDATE } from "@events"
// 
export const StylesheetView = (props: { toggle: Function, openState: Plugin.OpenState }) => {
  const settings = useContext(LinterContext)

  const [openState, setOpenState] = useState({
    general: props.openState.general,
    styles: props.openState.styles
  })


  const toggleOpenState = (prop: Plugin.OpenSection) => {
    const newState = { ...openState }
    newState[prop] = !openState[prop]
    setOpenState(newState)
    io.send(OPEN_STATE_UPDATE, newState)
  }

  return (
    <React.Fragment>
      <SectionWrapper expanded={openState.general}>
        <SectionHeader expanded={openState.general} onClick={() => toggleOpenState('general')}>General</SectionHeader>
        <SectionContent expanded={openState.general}>
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

      <SectionWrapper expanded={openState.styles}>
        <SectionHeader expanded={openState.styles} onClick={() => toggleOpenState('styles')}>Styles</SectionHeader>
        <SectionContent expanded={openState.styles}>
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
