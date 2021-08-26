import React, { useState, useContext } from "react"
import styled from 'styled-components'
import io from 'figmaio/ui'
import { Route, NavLink, HashRouter } from "react-router-dom"

// ******************** //
// LOCAL INCLUDES
// ******************** //

import { SectionWrapper, SectionHeader, SectionContent } from '@components/section'
import { Checkbox } from "@components/checkbox"
import { Content } from "@components/content"
import { P, H3 } from "@components/typography"
import { ButtonPrimary, ButtonPrimaryOutline } from "@components/button"
import { Select } from "@components/select"
import { LinterContext } from "../components/linterContext"
import { OPEN_STATE_UPDATE } from "@events"
import { Arrow } from "@icons/arrow"
import { Text } from "@icons/text"
import { Style } from "@icons/style"
import { MAIN_ROUTE, COLORS_ROUTE, TEXTS_ROUTE } from '@routes'
import { TokenSection } from '@components/tokenSection'
import { Separator } from '@components/separator'
import { Input } from '@components/input'

const LintWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 16px;
  background: rgb(255,255,255);
  background: linear-gradient(0deg, rgba(255,255,255,1) 20%, rgba(255,255,255,0) 100%);
`

const Spacer = styled.div`
  padding-left: 3rem;
  margin-bottom: 4px;
`


export const SettingsView = (props: { toggle: Function, change: Function, openState: Plugin.OpenState, setOpenState: Function }) => {
  const settings = useContext(LinterContext)
  // const { value:ignoreString, bind:ignoreStringBind } = useInput(settings.ignoreLayersWith)

  const [ignoreString, setIgnoreString] = useState(settings.ignoreLayersWith)

  const toggleOpenState = (prop: Plugin.OpenSection) => {
    const newState = { ...props.openState }
    newState[prop] = !props.openState[prop]
    props.setOpenState(newState)
    io.send(OPEN_STATE_UPDATE, newState)
  }

  return (
    <div style={{ paddingBottom: '64px' }}>

      <SectionWrapper expanded={props.openState.tokens}>
        <SectionHeader expanded={props.openState.tokens} onClick={() => toggleOpenState('tokens')}>Tokens</SectionHeader>
        <SectionContent expanded={props.openState.tokens}>
          <Content>
            {/* <P style={{ marginBottom: '12px' }}>You currently have 0 tokens uploaded.</P> */}

            <TokenSection title={'Colors'} subtitle={'4 tokens synced'} icon={<Style />} href={COLORS_ROUTE} />
            <TokenSection title={'Typography'} subtitle={'No tokens synced'} icon={<Text />} href={TEXTS_ROUTE} />

          </Content>
        </SectionContent>
      </SectionWrapper>

      <SectionWrapper expanded={props.openState.general}>
        <SectionHeader expanded={props.openState.general} onClick={() => toggleOpenState('general')}>General</SectionHeader>
        <SectionContent expanded={props.openState.general}>
          <Content>
            <Checkbox
              label={'Skip locked layers'}
              checked={settings.skipLocked}
              onCheckboxChange={() =>
                props.toggle('skipLocked')
              }
            />

            <Checkbox
              label={'Ignore layers'}
              description={'That start with a string:'}
              checked={settings.ignoreLayers}
              onCheckboxChange={() =>
                props.toggle('ignoreLayers')
              }
            />

            {settings.ignoreLayers &&
              <Spacer>
                <Input value={ignoreString} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setIgnoreString(event.target.value)
                  const newSettings = { ...settings }
                  newSettings.ignoreLayersWith = event.target.value
                  props.change(newSettings)
                }} /> 
              </Spacer>
            }

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
              description={'Reposition and resize elements to whole numbers. Ignores vectors like boolean operations, polygons, stars etc.'}
              checked={settings.pixelPerfect}
              onCheckboxChange={() => props.toggle('pixelPerfect')}
            />

            <Checkbox
              label={'Layer name linting'}
              description={'Names like Frame 1, Group 2, Rectangle 3 are a no-go. You can also enforce casing:'}
              checked={settings.layerNameLinting}
              onCheckboxChange={() => props.toggle('layerNameLinting')}
            />

            {settings.layerNameLinting &&
              <Spacer>
                <Select
                  icon={<Arrow direction='down' />}
                  name="casingSettings"
                  id="casingSettings"
                  onChange={(selectedElement: any) => {
                    const newSettings = { ...settings }
                    newSettings.layerNameCase = selectedElement.target.value
                    props.change(newSettings)
                  }}
                  value={settings.layerNameCase}
                >
                  
                  <option value="noCase">No case</option>
                  <option value="camelCase">camelCase</option>
                  <option value="snakeCase">snake_case</option>
                  <option value="kebabCase">kebab-case</option>
                  <option value="pascalCase">PascalCase</option>
                </Select>
              </Spacer>
            }
          </Content>
        </SectionContent>
      </SectionWrapper>

      <SectionWrapper expanded={props.openState.styles}>
        <SectionHeader expanded={props.openState.styles} onClick={() => toggleOpenState('styles')}>Styles</SectionHeader>
        <SectionContent expanded={props.openState.styles}>
          <Content>
            {/* <P style={{ marginBottom: '12px' }}>If you use text, fill, stroke, or effect styles it is required a style to be set.</P> */}

            <Checkbox
              label={'Only uploaded styles are valid'}
              description={'Only styles that are uploaded to the plugin will be considered valid during linting.'}
              checked={settings.enforceUploadedStyles}
              onCheckboxChange={() => props.toggle('enforceUploadedStyles')}
            />

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

      <LintWrapper style={{ zIndex: 100 }}>
        <NavLink to={MAIN_ROUTE} style={{ textDecoration: 'none' }}>
          <ButtonPrimary label={'Save'} />
        </NavLink>
      </LintWrapper>
    </div>
  )
}
