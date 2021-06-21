import React from "react"
import styled from "styled-components"
import Button from "../tree/Button"
import parse from 'html-react-parser';

const StyledText = styled.div`
* {
    font-family: NeueMontrealRegular;
    color: ${({ theme }) => theme.colors.text};
  }
    white-space: nowrap;
    width: 100vw;
    position:relative;
    .block{
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items:baseline;
        width:80vw;
        margin:auto;
        padding:50px;
        @media (max-width: 1200px){
            width:100vw;
            padding:30px;
        }
        h3{
            ${({ theme }) => theme.textStyles.h2};
            white-space: break-spaces;
            margin-bottom:10px;
        }
        p{
            font-size:24px;
            white-space: break-spaces;
            line-height:1.6;
        }
    }
`

const TextBlock = (apiData) => {

  return (
    <StyledText data-scroll-section>
        <div className="block">
            <h3>{apiData.apiData.title}</h3>
            <p>{parse(apiData.apiData.content)}</p>
        </div>
    </StyledText>
  )}

export default TextBlock
