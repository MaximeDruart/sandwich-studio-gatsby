import React from "react"
import styled from "styled-components"
import { useTranslation } from "gatsby-plugin-react-i18next"
import { useMediaQuery } from "react-responsive"
import AniLink from "gatsby-plugin-transition-link/AniLink"

const StyledContainer = styled.div`
  width:100vw;
  height:100vh;
  display:flex;
  justify-content:center;
  align-items:center;
  div {
    background:#1F1F1F;
    width:300px;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    padding:20px;
    border-radius:10px;
    img{
        width:150px;
        border-radius:100%;
    }
  }
  * {
    font-family: NeueMontrealRegular;
    color: ${({ theme }) => theme.colors.text};
  }
`

const Container = ({children}) => {
  const { t } = useTranslation()
  const isMobile = useMediaQuery({ query: "(max-width: 600px)" })

  return (
    <StyledContainer>
        <div>
            {children}
        </div>
    </StyledContainer>
  )}

export default Container
