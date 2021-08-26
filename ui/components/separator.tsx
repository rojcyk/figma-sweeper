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

import {
  SEPARATOR
} from '@ui'


export const Separator = styled.hr`
  height: 1px;
  background-color: ${SEPARATOR};
  border: none;
  margin-top: 6px;
`