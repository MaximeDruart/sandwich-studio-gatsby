import styled from "styled-components"
import { motion } from "framer-motion"
import React, { useEffect, useLayoutEffect, useMemo, useRef } from "react"
import { gsap } from "gsap"

import HeroCanvas from "./HeroCanvas"
import { graphql } from "gatsby"
import { useTranslation } from "gatsby-plugin-react-i18next"
import useStore from "../../../store"

const StyledHero = styled.div`
  width: 100vw;
  height: 100vh;
  padding: 12vh max(5vw, 20px) 5vh max(5vw, 20px);

  * {
    font-family: NeueMontrealRegular;
    color: ${({ theme }) => theme.colors.text};
  }

  .canvas {
    position: absolute;
    top: 0;
    left: 0;
  }
  .load-screen {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 120;
    background: #0d0d0d;
  }
  .dom {
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    position: relative;
    width: 100%;
    height: 100%;
    user-select: none;
    pointer-events: none;

    .top-line,
    .bottom-line {
      display: flex;
      flex-flow: row nowrap;
      width: 100%;
    }

    .top-line {
      justify-content: flex-end;
      p {
        ${({ theme }) => theme.textStyles.h4};
        width: 40%;
        text-align: right;
        &:first-letter {
          text-transform: capitalize;
        }
      }
    }

    .bottom-line {
      display: flex;
      flex-flow: row nowrap;
      justify-content: flex-start;
      align-items: center;
      p {
        ${({ theme }) => theme.textStyles.h3};
        width: 40%;
        &:first-letter {
          text-transform: capitalize;
        }
      }
    }

    .we-are {
      position: absolute;
      top: 50%;
      left: 23%;
      transform: translate(0, -50%);
      display: flex;
      flex-flow: row nowrap;
      z-index: 1000;
      .left {
        text-transform: none;
      }
      .spacer {
        visibility: hidden;
      }
      span,
      .spacer {
        ${({ theme }) => theme.textStyles.h1};
        white-space: nowrap;
      }

      .caret-loader {
        overflow: hidden;
      }

      .right {
        margin-left: 30px;
        text-transform: lowercase;
      }
    }

    @media (max-width: 600px) {
      .top-line,
      .bottom-line {
        p {
          width: 100%;
        }
      }
      .we-are {
        left: 0%;
        .right {
          margin-left: 12px;
        }
      }
    }
  }
`

const getCaretLoaderString = progress => {
  let str = ""
  for (let i = 0; i < Math.floor(progress / 8); i++) str += "_"
  return str
}

const Hero = () => {
  let globalTimeline = useMemo(
    () =>
      gsap.timeline({
        paused: true,
        repeat: -1,
        defaults: { delay: 0.13 },
        delay: 0.5,
      }),
    []
  )
  const { t, ready } = useTranslation()
  const possibleWords = useMemo(
    () =>
      ready
        ? t("weAre", { returnObjects: true }).map(word => word + ".")
        : null,
    [t, ready]
  )
  const activeWordRef = useRef(null)
  const caretRef = useRef(null)
  const loadScreenRef = useRef(null)

  const canvasLoadStatus = useStore(state => state.canvasLoadStatus)

  useLayoutEffect(() => {
    if (possibleWords) {
      possibleWords.forEach(word => {
        let tl = gsap.timeline({ defaults: { delay: 0.11 }, delay: 0.65 })
        word.split("").forEach((_, index) => {
          tl.set(activeWordRef.current, { innerText: word.slice(0, index + 1) })
        })
        tl.to(caretRef.current, {
          opacity: 0,
          duration: 0,
          delay: 0.2,
          repeatDelay: 0.7,
          repeat: 4,
          yoyo: true,
        })
        word.split("").forEach((_, index) => {
          tl.set(activeWordRef.current, {
            innerText: word.slice(0, word.length - (index + 1)),
          })
        })
        globalTimeline.add(tl)
      })
    }

    return () => {
      globalTimeline.kill()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [possibleWords])

  useEffect(() => {
    if (canvasLoadStatus.progress < 100) {
    } else {
      gsap
        .to(loadScreenRef.current, { height: 0, delay: 0.7, duration: 1.3 })
        .then(() => {
          globalTimeline.play()
        })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvasLoadStatus])

  return (
    <StyledHero data-scroll-section>
      <div ref={loadScreenRef} className="load-screen"></div>
      <div className="dom">
        <div className="top-line">
          <p>{t("topLine")}</p>
        </div>
        <div className="we-are">
          <span className="left">We are</span>
          <span ref={activeWordRef} className="right"></span>
          <motion.span
            initial={{ scaleY: 0 }}
            animate={{
              scaleY: canvasLoadStatus.progress < 100 ? 0 : 1,
              transition: { delay: 2.2, duration: 0.3 },
            }}
            ref={caretRef}
            className="caret"
          >
            |
          </motion.span>
          <motion.div
            animate={{
              width: canvasLoadStatus.progress < 100 ? "initial" : 0,
            }}
            className="caret caret-loader"
          >
            <motion.span>
              {getCaretLoaderString(canvasLoadStatus.progress)}
            </motion.span>
          </motion.div>
        </div>
        <div className="bottom-line">
          <p>{t("bottomLine")}</p>
        </div>
      </div>
      <HeroCanvas />
    </StyledHero>
  )
}

export default Hero

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
