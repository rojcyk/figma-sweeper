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
  margin-top: ${(padding) => padding ? padding + 'px' : '0'};
  margin-bottom: ${(padding) => padding ? padding + 'px' : '0'};
`