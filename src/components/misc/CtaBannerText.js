import React from "react"
import styled from "styled-components"
import Button from "../tree/Button"
import parse from 'html-react-parser';

const StyledBanner = styled.div`

  * {
    font-family: NeueMontrealRegular;
    color: ${({ theme }) => theme.colors.text};
  }
    white-space: nowrap;
    width: 100vw;
    margin-top: 8vh;
    position:relative;
    .banner{
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items:baseline;
        width:80vw;
        margin:auto;
        padding:50px;
        background-image:url("/images/pattern.svg");
        background-size: cover;
        @media (max-width: 1200px){
            width:100vw;
            padding:30px;
        }
        h3{
            font-size:32px;
            font-family:NeueMontrealBold;
            white-space: break-spaces;
            margin-bottom:10px;
            color:#292929;
        }
        .content{
          color:#292929;
          font-size:18px;
          white-space: break-spaces;
          p{
            color:#292929;
            font-size:18px;
            white-space: break-spaces;
          }
        }
    }
`

const CtaBannerText = (apiData) => {

  return (
    <StyledBanner>
        <div className="banner">
            <h3>{apiData.apiData.title}</h3>
            <div className="content">
              {parse(apiData.apiData.content)}
            </div>
            <Button target={apiData.apiData.ctaaction} >{apiData.apiData.ctaanchor}</Button>
        </div>
    </StyledBanner>
  )}
export default CtaBannerText
