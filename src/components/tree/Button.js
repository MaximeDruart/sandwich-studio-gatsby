import React from "react"
import styled from "styled-components"
import AniLink from "gatsby-plugin-transition-link/AniLink"

const StyledButton = styled.div`
  width: ${props   => props.isFullWidth ? "100%" : "fit-content"};
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
