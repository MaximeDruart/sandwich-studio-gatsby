import React from "react"
import styled from "styled-components"
import { useTranslation } from "gatsby-plugin-react-i18next"
import { useMediaQuery } from "react-responsive"
import parse from 'html-react-parser';

const StyledAbout = styled.div`
  width: 100vw;

  padding: 5vh max(5vw, 40px) 0 max(5vw, 40px);

  * {
    font-family: NeueMontrealRegular;
    color: ${({ theme }) => theme.colors.text};
  }

  .headline {
    ${({ theme }) => theme.textStyles.headline};
    white-space: nowrap;
    width: 100%;
  }

  .about-section {
    display: flex;
    flex-flow: ${props => props.isReverse ? "row-reverse" : "row"} nowrap;
    justify-content: center;
    align-items:center;
    width: 100%;
    margin: auto;
    .photos {
      width: 30%;
      position: relative;
      width: max(30vw, 400px);
      height: max(30vw, 400px);
      background: center / cover url("${props => props.imgFront}");
      .photo {
        position: absolute;
        width: max(30vw, 400px);
        height: max(30vw, 400px);
        background: center / cover url("${props => props.imgBack}");
        bottom: -30%;
        right: ${props => props.isReverse ? "-30%" : "30%"};
      }
    }
    .text {
      ${props => props.isReverse ? "margin-right:20px;" : "margin-left:20px;"}
      width: max(40%, 400px);
      text-align: ${props => props.isReverse ? "left" : "right"};
      .title {
        ${({ theme }) => theme.textStyles.h2};
      }
      .desc {
        margin-top:10px;
        ${({ theme }) => theme.textStyles.text};
      }
    }
    @media (max-width: 1000px) {
      * {
        text-align: center;
      }
      flex-flow: column;

      /* align-items: center; */
      .photos {
        margin:auto;
        width: 240px;
        height: 240px;
        .photo {
          width: 240px;
          height: 240px;
        }
      }
      .text {
        width: 100%;
        text-align: center;
      }
      &.our-mission {
        .text {
          padding-top: 4vh;
        }
      }
    }
  }
`

const DoubleImageText = ({headline,imageFront,imageBack,title,body,reverse,apiData}) => {
  const { t } = useTranslation()
  headline = t(headline)
  const isMobile = useMediaQuery({ query: "(max-width: 600px)" })
  if(apiData){
    headline=apiData.headline
    imageFront =apiData.images[0].url
    imageBack =apiData.images[1].url
    title=apiData.title
    body=apiData.content
    reverse=apiData.isreverse
  }
  return (
    <StyledAbout id="about" data-scroll-section imgFront={imageFront} imgBack={imageBack} isReverse={reverse}>
      <div className="our-mission about-section">
        <div
          data-scroll
          data-scroll-speed={isMobile ? 0.5 : 2}
          className="photos"
        >
          <div
            data-scroll
            data-scroll-speed={isMobile ? 1 : 4}
            className="photo"
          ></div>
        </div>
        <div className="text">
          <h1 className="title">{t(title)}</h1>
          <div className="desc">{parse(t(body))}</div>
        </div>
      </div>
    </StyledAbout>
  )
}

export default DoubleImageText
