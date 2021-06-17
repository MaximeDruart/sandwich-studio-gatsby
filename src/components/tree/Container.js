import React from "react"
import styled from "styled-components"

const StyledContainer = styled.div`
  width:100vw;
  height:100vh;
  display:flex;
  justify-content:center;
  align-items:center;
  div {
    box-sizing: content-box;
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

  return (
    <StyledContainer>
        <div>
            {children}
        </div>
    </StyledContainer>
  )}

export default Container
