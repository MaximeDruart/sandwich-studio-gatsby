import { ThemeProvider } from "styled-components"
import React from "react"

import GlobalStyle from "./styles/globalStyle"
import theme from "./styles/defaultTheme"

export const wrapRootElement = ({ element }) => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    {element}
  </ThemeProvider>
)
