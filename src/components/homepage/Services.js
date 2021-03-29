import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { useTranslation } from "gatsby-plugin-react-i18next"
import { motion } from "framer-motion"

import { ReactComponent as Arrow } from "../../../assets/icons/arrow.svg"
import { useMediaQuery } from "react-responsive"

const StyledServices = styled.div`
  width: 100vw;
  /* overflow: hidden; */

  /* padding: 5vh max(5vw, 40px) 0 max(5vw, 40px); */

  * {
    font-family: NeueMontrealRegular;
    color: ${({ theme }) => theme.colors.text};
  }

  .headline {
    ${({ theme }) => theme.textStyles.headline};
    white-space: nowrap;
    width: 100%;
  }

  .section {
    margin-top: 20vh;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    padding: 5vh max(5vw, 40px) 0 max(5vw, 40px);

    &.tl-section {
      &.tl-section-1 {
        padding-top: 220vh;
      }
      &.tl-section-2 {
        padding-top: 200vh;
      }
      &.tl-section-3 {
        padding-top: 170vh;
      }
      &.tl-section-4 {
        padding-top: 80vh;
      }
    }

    &.merch {
      margin-top: 90vh;
      .decoration {
        position: relative;
        width: 55%;
        .merch-img {
          position: absolute;
          &.merch-img-2 {
            left: 30%;
            top: -80%;
          }
          &.merch-img-3 {
            left: -15%;
            bottom: -30%;
          }
          &.merch-img-1 {
            top: 30%;
            right: 20%;
          }
        }
        @media (max-width: 600px) {
          width: 100%;
          height: 330px;
          .merch-img {
            &.merch-img-1 {
              top: 47%;
              right: 13%;
            }
            &.merch-img-2 {
              top: 11%;
              left: 36%;
            }
            &.merch-img-3 {
              left: 5%;
              bottom: 13%;
            }
          }
        }
      }
    }

    .decoration {
      width: 50%;
      display: flex;
      flex-flow: center;
      justify-content: center;
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
    @media (max-width: 600px) {
      flex-flow: column;
      align-items: center;
      margin-top: 5vh;
      * {
        text-align: center;
      }
      .decoration {
        width: 100%;
      }
      .text,
      .text.align-right {
        margin-top: 5vh;
        width: 100%;
        align-items: center;
        text-align: center;
        .title {
          margin-bottom: 10px;
        }
      }
    }
  }
`

const variants = {
  drawn: { strokeDashoffset: 0, transition: { duration: 0.6 } },
}
const fillVariants = {
  drawn: { opacity: 1, transition: { delay: 0.8 } },
}

const ctaVariants = {
  hover: {
    x: 10,
  },
}

const CallToActionButton = ({ text }) => {
  return (
    <motion.button whileHover="hover" className="cta">
      <span className="text-content">{text}</span>
      <motion.div variants={ctaVariants}>
        <Arrow className="arrow" />
      </motion.div>
    </motion.button>
  )
}

const Services = ({ scroll }) => {
  const { t } = useTranslation()
  const [isOnScreen, setIsOnScreen] = useState(false)

  useEffect(() => {
    if (scroll) {
      scroll.on("call", call => {
        if (call === "design") {
          setIsOnScreen(true)
        }
      })
    }
    return () => {
      if (scroll) scroll.destroy()
    }
  }, [scroll])

  const isMobile = useMediaQuery({ query: "(max-width: 600px)" })

  return (
    <StyledServices id="services" data-scroll-section>
      <div
        data-scroll
        data-scroll-direction="horizontal"
        data-scroll-speed="9"
        className="headline"
      >
        {t("services-headline")} • {t("services-headline")} •{" "}
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
            animate={isOnScreen ? "drawn" : ""}
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
            <motion.path
              initial={{
                strokeDasharray: 1000,
                strokeDashoffset: 1000,
              }}
              variants={variants}
              d="M3.27139 0.5H195.472C197.002 0.5 198.242 1.74041 198.242 3.27054V32.0885V63.6769H0.500854V3.27054C0.500854 1.74041 1.74127 0.5 3.27139 0.5Z"
              fill="none"
              stroke="white"
            />
            <motion.rect
              initial={{ opacity: 0 }}
              variants={{ drawn: { opacity: 1, transition: { delay: 1.7 } } }}
              x="0.5"
              y="93.6595"
              width="197.741"
              height="48.6854"
              fill="#FFB23E"
              stroke="#FFB23E"
            />
            <motion.path
              initial={{ opacity: 0 }}
              tag="FILL"
              variants={fillVariants}
              d="M0.5 170.258H198.241V230.664C198.241 232.194 197.001 233.435 195.471 233.435H3.27054C1.74041 233.435 0.5 232.194 0.5 230.664V170.258Z"
              fill="white"
              stroke="white"
            />
            <motion.path
              initial={{
                strokeDasharray: 1000,
                strokeDashoffset: 1000,
              }}
              variants={variants}
              d="M0.5 170.258H198.241V230.664C198.241 232.194 197.001 233.435 195.471 233.435H3.27054C1.74041 233.435 0.5 232.194 0.5 230.664V170.258Z"
              fill="none"
              stroke="white"
            />
          </motion.svg>
        </div>
        <div className="text align-right">
          <div className="title">{t("services-1-title")} </div>
          <div className="body">{t("services-1-body")} </div>

          <CallToActionButton text={t("services-1-cta")} />
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
          <div className="title">{t("services-2-title")} </div>
          <div className="body">{t("services-2-body")} </div>

          <CallToActionButton text={t("services-2-cta")} />
        </div>
        <div className="decoration"></div>
      </div>

      <div
        data-scroll
        data-scroll-id="tl-website"
        data-scroll-offset="35%,77%"
        data-scroll-position="top"
        className="section second tl-section tl-section-3"
      >
        <div className="text">
          <div className="title">{t("services-3-title")} </div>
          <div className="body">{t("services-3-body")} </div>

          <CallToActionButton text={t("services-3-cta")} />
        </div>
        <div className="decoration"></div>
      </div>

      <div
        data-scroll
        data-scroll-id="tl-final"
        data-scroll-offset="10%,100%"
        data-scroll-position="top"
        className="section merch tl-section tl-section-4"
      >
        <div className="decoration">
          <motion.img
            data-scroll
            data-scroll-speed="1"
            className="merch-img merch-img-1"
            src={isMobile ? "/images/merch-1-sm.png" : "/images/merch-1.png"}
            alt=""
          />
          <motion.img
            data-scroll
            data-scroll-speed="2"
            className="merch-img merch-img-2"
            src={isMobile ? "/images/merch-2-sm.png" : "/images/merch-2.png"}
            alt=""
          />
          <motion.img
            data-scroll
            data-scroll-speed="1.4"
            className="merch-img merch-img-3"
            src={isMobile ? "/images/merch-3-sm.png" : "/images/merch-3.png"}
            alt=""
          />
        </div>
        <div className="text align-right">
          <div className="title">{t("services-5-title")} </div>
          <div className="body">{t("services-5-body")} </div>

          <CallToActionButton text={t("services-5-cta")} />
        </div>
      </div>
    </StyledServices>
  )
}

export default Services
