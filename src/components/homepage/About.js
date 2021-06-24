import React from "react"
import styled from "styled-components"
import { useTranslation } from "gatsby-plugin-react-i18next"
import parse from 'html-react-parser';
import Headline from "../../components/misc/Headline"
import { useMediaQuery } from "react-responsive";
const StyledAbout = styled.div`
  width: 100vw;
  padding: 5vh max(5vw, 40px) 0 max(5vw, 40px);
  * {
    font-family: NeueMontrealRegular;
    color: ${({ theme }) => theme.colors.text};
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
      background: center / cover url("${props => props.imgWhoFront}");
      .photo {
        position: absolute;
        width: max(30vw, 400px);
        height: max(30vw, 400px);
        background: center / cover url("${props => props.imgWhoBack}");
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
      margin-bottom: 30vh;
      .photos {
        background: center / cover url("${props => props.imgMission}");
        .photo-bm {
          position: absolute;
          width: max(30vw, 400px);
          height: max(30vw, 400px);
          background: center / cover url("${props => props.imgMissionOne}");
          bottom: -50vh;
          left: -20vw;
        }
        .photo-bl {
          position: absolute;
          width: max(30vw, 400px);
          height: max(30vw, 400px);
          background: center / cover url("${props => props.imgMissionTwo}");
          bottom: -40vh;
          left: -60vw;
        }
      }
      .text {
        text-align: left;
      }
    }
    @media (max-width: 600px) {
      * {
        text-align: center;
      }
      flex-flow: column;
      .photos {
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
          padding-top: 12vh;
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
const About = ({titleWho,bodyWho,imgWhoFront,imgWhoBack,titleMission,bodyMission,imgMission,imgMissionOne,imgMissionTwo}) => {
  const { t } = useTranslation()
  const isMobile = useMediaQuery({ query: "(max-width: 600px)" })
  return (
    <StyledAbout id="about"
    imgWhoFront={t("images-url")+imgWhoFront}
    imgWhoBack={t("images-url")+imgWhoBack}
    imgMission={t("images-url")+imgMission}
    imgMissionOne={t("images-url")+imgMissionOne}
    imgMissionTwo={t("images-url")+imgMissionTwo}
    >
      <Headline title="À propos"/>
      <div className="our-mission about-section">
        <div
        data-scroll
        data-scroll-speed={isMobile ? 0.5 : 2}
        className="photos">
          <div 
          data-scroll
          data-scroll-speed={isMobile ? 1 : 4}
          className="photo">
          </div>
        </div>
        <div className="text">
          <div className="title">{titleWho}</div>
          <div className="desc">{parse(bodyWho)}</div>
        </div>
      </div>
      <div className="who-we-are about-section">
        <div 
          className="photos"
          data-scroll
          data-scroll-speed={isMobile ? 0.5 : 2}>
          <div
          data-scroll
          data-scroll-speed={isMobile ? 0.25 : 1}
          className="photo photo-bl"></div>
          <div
          data-scroll
          data-scroll-speed={isMobile ? 0.5 : 2}
          className="photo photo-bm"></div>
        </div>
        <div className="text">
          <div className="title">{titleMission}</div>
          <div className="desc">{parse(bodyMission)}</div>
        </div>
      </div>
    </StyledAbout>
  )
}
export default About
