
import { createGlobalStyle } from "styled-components"

// ******************** //
// LOCAL INCLUDES
// ******************** //

import { BACKGROUND } from "@ui"


// ******************** //
// TOP LVL STYLING
// ******************** //

export const GlobalStyles = createGlobalStyle`
  *, *:before, *:after {
    box-sizing: border-box;
  }

  html {
    /* font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"; */
    font-family: 'Inter', sans-serif;
    font-size: 12px;
    overflow-y: scroll;
    overflow-x: hidden;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none;  /* IE 10+ */
  }

  ::-webkit-scrollbar {
    width: 0px;  /* Remove scrollbar space */
    background: transparent;  /* Optional: just make scrollbar invisible */
  }

  html,
  body {
    padding: 0;
    margin: 0;
    background-color: ${BACKGROUND};
  }

  .switch-wrapper {
    position: relative;
  }

  .switch-wrapper > div {
    position: absolute;
    width: 100%;
  }
`

export default GlobalStyles