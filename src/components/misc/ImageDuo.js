import React from "react"
import styled from "styled-components"
import Button from "../tree/Button"

const StyledImage = styled.div`
* {
    font-family: NeueMontrealRegular;
    color: ${({ theme }) => theme.colors.text};
  }
    white-space: nowrap;
    width: 100vw;
    margin-top: 4vh;
    position:relative;
    .block{
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items:baseline;
        width:80vw;
        margin:auto;
        @media (max-width: 1200px){
            width:90vw;
        }
        .duo{
            display:grid;
            grid-template-columns: 1fr 1fr;
            grid-gap:40px;
            @media (max-width: 1200px){
                grid-template-columns: 1fr;
            }
            img{
                width:100%;
            }
        }
        figcaption{
            margin-top:10px;
        }
    }
`

const ImageDuo = (apiData) => {

  return (
    <StyledImage data-scroll-section>
        <figure className="block">
            <div className="duo">
                <img src={apiData.apiData.images[0].url}></img>
                <img src={apiData.apiData.images[1].url}></img>
            </div>
            <figcaption>
                <p>{apiData.apiData.caption}</p>
            </figcaption>
        </figure>
    </StyledImage>
  )}

export default ImageDuo
