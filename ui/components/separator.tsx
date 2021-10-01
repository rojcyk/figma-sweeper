import styled from 'styled-components'

// ******************** //
// LOCAL INCLUDES
// ******************** //

import {
  SEPARATOR
} from '@ui'


export const Separator = styled.hr<{ margin?: number }>`
  height: 1px;
  background-color: ${SEPARATOR};
  border: none;
  margin:0;
  padding:0;
  margin-top: ${({ margin }) => margin ? `${margin}px` : '0'};
  margin-bottom: ${({ margin }) => margin ? `${margin}px` : '0'};
`