import React from "react"
import styled from "styled-components"
import { useTranslation } from "gatsby-plugin-react-i18next"
import { useMediaQuery } from "react-responsive"
import Headline from "../misc/Headline"

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
    flex-flow: row nowrap;
    margin-top: 7vh;
    justify-content: space-between;

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
        right: -30%;
      }
    }
    .text {
      width: max(40%, 400px);
      text-align: right;
      .title {
        ${({ theme }) => theme.textStyles.h2};
      }
      .desc {
        margin-top:10px;
        ${({ theme }) => theme.textStyles.text};
      }
    }

    &.our-mission {
      .text {
        padding-top: 30vh;
      }
    }

    &.who-we-are {
      flex-direction: row-reverse;
      margin-top: 25vh;
      margin-bottom: 55vh;
      .text {
        text-align: right;
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
      &.who-we-are {
        margin-top: 20vh;
        flex-flow: column;
        .photos {
          width: 180px;
          height: 180px;
          .photo-bm {
            width: 180px;
            height: 180px;
            bottom: 20vh;
            left: 60vw;
          }
          .photo-bl {
            width: 180px;
            height: 180px;
            bottom: -10vh;
            left: 30vw;
          }
        }
        .text {
          margin-top: 15vh;
        }
      }
    }
  }
`

const DoubleImageText = ({headline,imageFront,imageBack,title,body,apiData}) => {
  const { t } = useTranslation()
  headline = t(headline)
  const isMobile = useMediaQuery({ query: "(max-width: 600px)" })
  if(apiData){
    headline=apiData.headline
    imageFront =apiData.images[0].url
    imageBack =apiData.images[1].url
    title=apiData.title
    body=apiData.content
  }
  return (
    <StyledAbout id="about" data-scroll-section imgFront={imageFront} imgBack={imageBack}>
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
          <div className="desc">{t(body)}</div>
        </div>
      </div>
    </StyledAbout>
  )
}

export default DoubleImageText
