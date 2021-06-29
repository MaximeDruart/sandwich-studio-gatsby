import React from "react"
import styled from "styled-components"
import { useMediaQuery } from "react-responsive"
import PlaceHolder from '../misc/imagePlaceholder';

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
        img{
            width:100%;
        }
        figcaption{
            margin-top:10px;
        }
    }
`

const ImageBig = (apiData) => {
    const isMobile = useMediaQuery({ query: "(max-width: 1200px)" })
  return (
    <StyledImage>
        <figure className="block" data-aos="fade-up">
            <PlaceHolder
                src={apiData.apiData.image.formats.large.url}
                width={isMobile ? "90vw" : "80vw"}
                height="auto"
                ratio="16 / 9"  
            ></PlaceHolder>
            <figcaption>
                <p>{apiData.apiData.caption}</p>
            </figcaption>
        </figure>
    </StyledImage>
  )}

export default ImageBig
