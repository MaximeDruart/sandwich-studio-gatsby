import { useViewportScroll, motion } from "framer-motion"
import React, { useEffect } from "react"
import styled from "styled-components"
import { useTranslation } from "react-i18next"

const StyledAbout = styled.div`
  border: 1px solid yellow;
  width: 100vw;
  /* overflow: hidden; */

  padding: 5vh max(5vw, 50px) 0 max(5vw, 50px);

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
    border: thin solid red;
    justify-content: space-between;

    .photos {
      width: 30%;
      border: thin solid white;
      position: relative;
      width: max(30vw, 400px);
      height: max(30vw, 400px);
      background: center / cover url("/images/mission-2.jpg");
      .photo {
        position: absolute;
        width: max(30vw, 400px);
        height: max(30vw, 400px);
        background: center / cover url("/images/mission.jpg");
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
      margin-bottom: 55vh;

      .photos {
        .photo-bm {
          position: absolute;
          width: max(30vw, 400px);
          height: max(30vw, 400px);
          background: center / cover url("/images/mission-3.jpg");
          bottom: -60vh;
          left: -20vw;
        }
        .photo-bl {
          position: absolute;
          width: max(30vw, 400px);
          height: max(30vw, 400px);
          background: center / cover url("/images/mission.jpg");
          bottom: -40vh;
          left: -60vw;
        }
      }
      .text {
        text-align: left;
      }
    }
  }
`

const About = () => {
  const { t } = useTranslation()

  return (
    <StyledAbout data-scroll-section>
      <div
        data-scroll
        data-scroll-direction="horizontal"
        data-scroll-speed="9"
        className="headline"
      >
        {t("about-headline")}
      </div>
      <div className="our-mission about-section">
        <div data-scroll data-scroll-speed="2" className="photos">
          <div data-scroll data-scroll-speed="4" className="photo"></div>
        </div>
        <div className="text">
          <div className="title">{t("about-1-title")}</div>
          <div className="desc">{t("about-1-body")}</div>
        </div>
      </div>
      <div className="who-we-are about-section">
        <div data-scroll data-scroll-speed="2" className="photos">
          <div
            data-scroll
            data-scroll-speed="1"
            className="photo photo-bl"
          ></div>
          <div
            data-scroll
            data-scroll-speed="1.5"
            className="photo photo-bm"
          ></div>
        </div>
        <div className="text">
          <div className="title">{t("about-2-title")}</div>
          <div className="desc">{t("about-2-body")}</div>
        </div>
      </div>
    </StyledAbout>
  )
}

export default About
