import React from "react"
import styled from "styled-components"
import { graphql } from "gatsby"
import { useTranslation } from "gatsby-plugin-react-i18next"
// import { useMediaQuery } from "react-responsive"

const StyledAbout = styled.div`
  width: 100vw;

  padding: 5vh max(5vw, 20px) 0 max(5vw, 20px);

  * {
    font-family: NeueMontrealRegular;
    /* color: ${({ theme }) => theme.colors.text}; */
  }

  .headline {
    /* ${({ theme }) => theme.textStyles.headline}; */
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
        /* ${({ theme }) => theme.textStyles.h2}; */
      }
      .desc {
        /* ${({ theme }) => theme.textStyles.text}; */
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
          bottom: -50vh;
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
    @media (max-width: 600px) {
      * {
        text-align: left;
      }
      flex-flow: column;
      /* align-items: center; */
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

const About = () => {
  const { t } = useTranslation()

  // const isMobile = useMediaQuery({ query: "(max-width: 600px)" })

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
          <div className="title">{t("about-1-title")}</div>
          <div className="desc">{t("about-1-body")}</div>
        </div>
      </div>
      <div className="who-we-are about-section">
        <div
          data-scroll
          data-scroll-speed={isMobile ? 0.5 : 2}
          className="photos"
        >
          <div
            data-scroll
            data-scroll-speed={isMobile ? 0.25 : 1}
            className="photo photo-bl"
          ></div>
          <div
            data-scroll
            data-scroll-speed={isMobile ? 0.5 : 2}
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

export const query = graphql`
  query($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`
