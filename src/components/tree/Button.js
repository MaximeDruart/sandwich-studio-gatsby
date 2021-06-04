import React from "react"
import styled from "styled-components"
import { useTranslation } from "gatsby-plugin-react-i18next"
import { useMediaQuery } from "react-responsive"
import AniLink from "gatsby-plugin-transition-link/AniLink"

const StyledButton = styled.div`
  ${props => props.isFullWidth ? "width:100%;" : null}
  padding:0px !important;
  a{
    ${({ theme }) => theme.textStyles.button};
    color:black;
    display:block;
    text-align:center;
    width:100%;}
  * {
    font-family: NeueMontrealRegular;
    color: ${({ theme }) => theme.colors.text};
  }
`

const Button = ({target, children,fullWidth}) => {
  const { t } = useTranslation()
  const isMobile = useMediaQuery({ query: "(max-width: 600px)" })

  return (
    <StyledButton isFullWidth={fullWidth}>
      <AniLink
      cover
      direction="down"
      bg="#0D0D0D"
      to={target}
      >
        {children}
      </AniLink>
    </StyledButton>
  )}

export default Button
