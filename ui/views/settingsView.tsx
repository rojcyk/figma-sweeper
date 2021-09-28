import React, { useState, useContext } from "react"
import styled from 'styled-components'
import io from 'figmaio/ui'

// ******************** //
// LOCAL INCLUDES
// ******************** //

import { SectionWrapper, SectionHeader, SectionContent } from '@components/section'
import { Checkbox } from "@components/checkbox"
import { Content } from "@components/content"
import { Select } from "@components/select"
import { LinterContext } from "../components/linterContext"
import { SEPARATOR } from '@ui'
import { OPEN_STATE_UPDATE } from "@events"
import { Arrow } from "@icons/arrow"
import { Text } from "@icons/text"
import { Style } from "@icons/style"
import { COLORS_ROUTE, TEXTS_ROUTE } from '@routes'
import { TokenSection } from '@components/tokenSection'
import { Input } from '@components/input'
import { Separator } from '@components/separator'
import { NavigationBar } from '@components/navigationBar'

const Spacer = styled.div`
  padding-left: 3rem;
  margin-bottom: 4px;
`


export const SettingsView = (props: { toggle: Function, change: Function, openState: Plugin.OpenState, setOpenState: Function }) => {
  const { settings, paintStyles, textStyles } = useContext(LinterContext)
  const [ignoreString, setIgnoreString] = useState(settings.ignoreLayersWith)

  const toggleOpenState = (prop: Plugin.OpenSection) => {
    const newState = { ...props.openState }
    newState[prop] = !props.openState[prop]
    props.setOpenState(newState)
    io.send(OPEN_STATE_UPDATE, newState)
  }

  return (
    <div style={{ paddingBottom: '64px' }}>
      <NavigationBar back={true} title={'Settings'} />
      <Separator />

      <SectionWrapper expanded={props.openState.tokens}>
        <SectionHeader expanded={props.openState.tokens} onClick={() => toggleOpenState('tokens')}>Tokens</SectionHeader>
        <SectionContent expanded={props.openState.tokens}>
          <Content>
            <TokenSection
              title={'Colors'}
              subtitle={`${paintStyles.length > 0 ? paintStyles.length : 'No' } styles synced`}
              icon={<Style />}
              href={COLORS_ROUTE}
            />

            <TokenSection
              title={'Typography'}
              subtitle={`${textStyles.length > 0 ? textStyles.length : 'No' } styles synced`}
              icon={<Text />}
              href={TEXTS_ROUTE}
            />

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
              label={'Make pixel-perfect'}
              description={'Reposition and resize elements to whole numbers. Ignores vectors like boolean operations, polygons, stars etc.'}
              checked={settings.pixelPerfect}
              onCheckboxChange={() => props.toggle('pixelPerfect')}
            />

            
          </Content>
        </SectionContent>
      </SectionWrapper>

      <SectionWrapper expanded={props.openState.layerList}>
        <SectionHeader expanded={props.openState.layerList} onClick={() => toggleOpenState('layerList')}>Layer list</SectionHeader>
        <SectionContent expanded={props.openState.layerList}>
          <Content>
            {/* <P style={{ marginBottom: '12px' }}>If you use text, fill, stroke, or effect styles it is required a style to be set.</P> */}

            <Checkbox
              label={'Delete hidden layers'}
              checked={settings.deleteHidden}
              onCheckboxChange={() => props.toggle('deleteHidden')}
            />

            <Checkbox
              label={'No groups'}
              description={'Like, at all. Why would you want to use groups anyways?'}
              checked={settings.noGroups}
              onCheckboxChange={() => props.toggle('noGroups')}
            />

            {settings.noGroups === false && 
              <div style={{
                paddingLeft: '9px',
                marginLeft: '17px',
                borderLeft: `1px solid ${SEPARATOR}`
              }}>
              <Checkbox
                label={'Ungroup single-layer groups'}
                checked={settings.ungroupSingleGroup}
                onCheckboxChange={() => props.toggle('ungroupSingleGroup')}
              />
              </div>
            }

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
    </div>
  )
}
