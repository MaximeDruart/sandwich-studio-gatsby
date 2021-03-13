import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { useTranslation } from "react-i18next"
import { motion } from "framer-motion"

import { ReactComponent as Arrow } from "../../../assets/icons/arrow.svg"
import useStore from "../../../store"

const StyledServices = styled.div`
  border: 1px solid yellow;
  width: 100vw;
  /* overflow: hidden; */

  /* padding: 5vh max(5vw, 50px) 0 max(5vw, 50px); */

  * {
    font-family: NeueMontrealRegular;
    color: ${({ theme }) => theme.colors.text};
  }

  .headline {
    ${({ theme }) => theme.textStyles.headline};
    white-space: nowrap;
    width: 100%;
  }

  .tl-section {
    &.tl-section-1 {
      padding-top: 130vh;
      border: 5px solid red;
    }
    &.tl-section-2 {
      padding-top: 200vh;
      border: 5px solid blue;
    }
    &.tl-section-3 {
      padding-top: 170vh;
      border: 5px solid green;
    }
  }
  .section {
    margin-top: 20vh;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    padding: 5vh max(5vw, 50px) 0 max(5vw, 50px);

    &.second {
    }

    .decoration {
    }

    .text {
      width: 40%;
      display: flex;
      flex-flow: column nowrap;
      align-items: flex-start;
      &.align-right {
        text-align: right;
        align-items: flex-end;
      }
      .title {
        ${({ theme }) => theme.textStyles.h3};
      }
      .body {
        ${({ theme }) => theme.textStyles.text};
      }

      .cta {
        ${({ theme }) => theme.textStyles.button};
      }
    }
  }
`

const variants = {
  drawn: { strokeDashoffset: 0 },
  hidden: { strokeDashoffset: 1000 },
}
const fillVariants = {
  drawn: { opacity: 1 },
}

const Services = ({ scroll }) => {
  const { t } = useTranslation()
  const [isOnScreen, setIsOnScreen] = useState(false)

  return (
    <StyledServices data-scroll-section>
      <div
        data-scroll
        data-scroll-direction="horizontal"
        data-scroll-speed="9"
        className="headline"
      >
        {t("services-headline")}
      </div>

      <div
        data-scroll
        data-scroll-call="design"
        data-scroll-offset="40%"
        className="section"
      >
        <div className="decoration">
          <motion.svg
            whileHover="drawn"
            animate={isOnScreen ? "drawn" : "hidden"}
            width="199"
            height="234"
            viewBox="0 0 199 234"
          >
            <motion.path
              initial={{ opacity: 0 }}
              tag="FILL"
              variants={fillVariants}
              d="M3.27139 0.5H195.472C197.002 0.5 198.242 1.74041 198.242 3.27054V32.0885V63.6769H0.500854V3.27054C0.500854 1.74041 1.74127 0.5 3.27139 0.5Z"
              fill="white"
              stroke="white"
            />
            <motion.rect
              x="0.5"
              y="93.6595"
              width="197.741"
              height="48.6854"
              fill="#FFB23E"
              stroke="#FFB23E"
            />
            <motion.path
              style={{
                strokeDasharray: 100,
              }}
              variants={variants}
              d="M0.5 170.258H198.241V230.664C198.241 232.194 197.001 233.435 195.471 233.435H3.27054C1.74041 233.435 0.5 232.194 0.5 230.664V170.258Z"
              fill="none"
              stroke="white"
            />
            <motion.path
              initial={{ opacity: 0 }}
              tag="FILL"
              variants={fillVariants}
              d="M0.5 170.258H198.241V230.664C198.241 232.194 197.001 233.435 195.471 233.435H3.27054C1.74041 233.435 0.5 232.194 0.5 230.664V170.258Z"
              fill="white"
              stroke="white"
            />
          </motion.svg>
        </div>
        <div className="text align-right">
          <div className="title">{t("services-1-title")} </div>
          <div className="body">{t("services-1-body")} </div>
          <button className="cta">
            <span className="text-content">{t("services-1-cta")}</span>
            <Arrow className="arrow" />
          </button>
        </div>
      </div>

      <div
        data-scroll
        data-scroll-id="tl-top-to-side"
        data-scroll-offset="15%,77%"
        data-scroll-position="top"
        className="section second tl-section tl-section-1"
      >
        <div className="text">
          <div className="title">{t("services-1-title")} </div>
          <div className="body">{t("services-1-body")} </div>
          <button className="cta">
            <span className="text-content">{t("services-1-cta")}</span>
            <Arrow className="arrow" />
          </button>
        </div>
        <div className="decoration"></div>
      </div>

      <div
        data-scroll
        data-scroll-id="tl-branding"
        data-scroll-offset="35%,77%"
        data-scroll-position="top"
        className="section tl-section tl-section-2"
      >
        <div className="decoration"></div>
        <div className="text align-right">
          <div className="title">{t("services-1-title")} </div>
          <div className="body">{t("services-1-body")} </div>
          <button className="cta">
            <span className="text-content">{t("services-1-cta")}</span>
            <Arrow className="arrow" />
          </button>
        </div>
      </div>
      <div
        data-scroll
        data-scroll-id="tl-website"
        data-scroll-offset={window.innerHeight / 2}
        className="section second tl-section tl-section-3"
      >
        <div className="text">
          <div className="title">{t("services-1-title")} </div>
          <div className="body">{t("services-1-body")} </div>
          <button className="cta">
            <span className="text-content">{t("services-1-cta")}</span>
            <Arrow className="arrow" />
          </button>
        </div>
        <div className="decoration"></div>
      </div>
    </StyledServices>
  )
}

export default Services
