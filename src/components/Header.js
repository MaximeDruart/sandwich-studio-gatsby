import React, { useCallback, useState } from "react"
import styled from "styled-components"
import { ReactComponent as Logo } from "../../assets/icons/header-logo.svg"
import { motion } from "framer-motion"
import { useTranslation } from "gatsby-plugin-react-i18next"
import useStore from "../../store"
import { useMediaQuery } from "react-responsive"
import { navigate } from "gatsby"
import AniLink from "gatsby-plugin-transition-link/AniLink"

const StyledHeader = styled(motion.div)`
  * {
    font-family: NeueMontrealRegular;
    color: ${({ theme }) => theme.colors.text};
    ${({ theme }) => theme.textStyles.h6};
  }
  z-index: 10000;
  width: 100vw;
  height: 10vh;
  position: fixed;
  top: 0;
  padding: 0 max(5vw, 40px);

  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;

  .left {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    cursor: pointer;
    .logo {
      margin-right: 10px;
    }
    .logo-text {
      font-family: "BerlinBold";
    }
  }

  .right {
    ul.desk {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      li {
        position: relative;
        padding: 0 15px;
        overflow: hidden;
        .link-button {
          display: block;
          cursor: pointer;
          .anim-link {
            &.bottom-link {
              position: absolute;
            }
          }
        }
        &.link-dropdown {
          position: relative;
          overflow: visible;
          .text {
            display: flex;
            flex-flow: row nowrap;

            .arrow {
              margin-left: 6px;
            }
          }

          .dropdown {
            position: absolute;
            padding: 10px;
            background:rgba(0,0,0,0.0);
            backdrop-filter:blur(20px);
            ul {
              li {
                padding: 5px 0;
              }
            }
          }
        }

        &:last-child {
          padding-right: 0;
        }
      }
    }

    .sandwich {
      .bars {
        width: 40px;
        height: 20px;
        display: flex;
        flex-flow: column nowrap;
        justify-content: space-between;
        z-index: 1000;
        position: relative;
        .bar {
          width: 100%;
          height: 3px;
          background: white;
        }
      }

      .content {
        position: fixed;
        height: 100vh;
        width: 80vw;
        background: ${({ theme }) => theme.colors.grey};
        top: 0;
        right: -80%;
        z-index: 20;
        padding: 8vh 8vw 5vh 8vw;
        display: flex;
        flex-flow: column nowrap;
        justify-content: space-between;
        ul.mobile-links {
          li {
            margin-bottom: 2vh;
            .link-button {
              ${({ theme }) => theme.textStyles.h3};
            }
          }
        }
        .foot {
          display: flex;
          flex-flow: row nowrap;
          justify-content: space-between;
          .left {
            span {
              ${({ theme }) => theme.textStyles.text};
            }
          }

          .right {
            width: 25%;
            display: flex;
            justify-content: space-between;
            .email {
              margin-right: 4px;
            }
          }
        }
      }

      .filter {
        user-select: none;
        pointer-events: none;
        position: fixed;
        height: 100vh;
        width: 100vw;
        top: 0;
        left: 0;
        background: black;
        opacity: 0;
        z-index: 10;
      }
    }
  }
`

const variants = {
  hovering: {
    y: [0, 0, -30],
    skew: [0, 25, 0],
    transition: { ease: "easeOut", duration: 0.25 },
  },
}

const hamburgerVariantsTop = {
  open: { y: 9, rotate: -45 },
}
const hamburgerVariantsBot = {
  open: { y: -9, rotate: 45 },
}
const hamburgerContentVariants = {
  open: { right: 0, transition: { ease: "easeInOut" } },
}
const hamburgerFilterVariants = {
  open: { opacity: 0.6 },
}

const Header = ({ location, scroll, isHomepage }) => {
  const [hamIsOpen, setHamIsOpen] = useState(false)
  const all = useTranslation()
  // const { t, i18n } = all
  const { t, ready } = all

  const canvasLoadStatus = useStore(state => state.canvasLoadStatus)

  const isMobile = useMediaQuery({ query: "(max-width: 800px)" })

  const internalLinkHandler = useCallback(
    category => {
      if (category === "contact") {
        navigate("/contact")
        return
      }
      if (category === "web") {
        navigate("/web")
        return
      }
      if (category === "design") {
        navigate("/design")
        return
      }
      if (category === "marketing") {
        navigate("/marketing")
        return
      }
      if (category === "packaging") {
        navigate("/packaging")
        return
      }
      if (location.pathname !== "/") {
        navigate("/")
        return
      }
      if (scroll)
        scroll.scrollTo(`#${category}`, {
          callback: () => isMobile && setHamIsOpen(false),
        })
    },
    [location.pathname, isMobile, scroll]
  )
  const scrollToTop = useCallback(() => {
    if (scroll) scroll.scrollTo(`top`)
  }, [scroll])

  return (
    <StyledHeader
      initial={{ opacity: isHomepage ? 0 : 1 }}
      animate={{
        opacity: isHomepage ? (canvasLoadStatus.progress < 100 ? 0 : 1) : 1,
        transition: { delay: 1.5 },
      }}
    >
      {/* i'm adding and hiding an anilink because it doesn't work without it. not sure why but an anilink probably needs to be there on first render so css / html for cover animation can be added accordingly */}
      <AniLink
        cover
        direction="down"
        bg="#0D0D0D"
        className="link-button"
        to="/"
      >
        <div className="left">
          <Logo className="logo" />
          <div className="logo-text">Sandwich.Studio</div>
        </div>
      </AniLink>
      <div className="right">
        {isMobile ? (
          <motion.div animate={hamIsOpen ? "open" : ""} className="sandwich">
            <motion.div
              onClick={() => setHamIsOpen(!hamIsOpen)}
              className="bars"
            >
              <motion.div
                variants={hamburgerVariantsTop}
                className="bar top-bar"
              ></motion.div>
              <motion.div
                variants={hamburgerVariantsBot}
                className="bar bottom-bar"
              ></motion.div>
            </motion.div>

            <motion.div
              variants={hamburgerFilterVariants}
              className="filter"
            ></motion.div>

            <motion.div variants={hamburgerContentVariants} className="content">
              <ul className="mobile-links">
                {ready &&
                  t("headerLinks", { returnObjects: true }).map(link => (
                    <li key={link.category}>
                      <button
                        className="link-button"
                        onClick={() => internalLinkHandler(link.category)}
                      >
                        {link.translation}
                      </button>
                    </li>
                  ))}
              </ul>
              <div className="foot">
                <div className="left">
                  <span>@sandwich.studio2021</span>
                </div>
                <div className="right">
                  <a className="email" href="mailto:someone@yoursite.com">
                    <img src="/images/email-icon.png" alt="link to email" />
                  </a>
                  <a
                    className="insta"
                    href="https://www.instagram.com/sandwich.std"
                  >
                    <img src="/images/insta-icon.png" alt="link to email" />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <ul className="desk">
            <motion.li whileHover="hover" className="link-button link-dropdown">
              <motion.div className="text">
                <p>Services</p>
                <motion.div
                  initial={{ rotate: 90, scale: 0.7 }}
                  variants={{ hover: { rotate: 270 } }}
                  className="arrow"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="white"
                      d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"
                    />
                  </svg>
                </motion.div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                variants={{
                  hover: { opacity: 1 },
                }}
                className="dropdown"
              >
                <ul>
                  {ready &&
                    t("headerLinksServices", { returnObjects: true }).map(
                      link => (
                        <motion.li
                          whileHover={{ skew: -20 }}
                          key={link.category}
                        >
                          <AniLink
                            cover
                            direction="down"
                            bg="#0D0D0D"
                            className="link-button"
                            to={`/${link.category}`}
                          >
                            {link.translation}
                          </AniLink>
                        </motion.li>
                      )
                    )}
                </ul>
              </motion.div>
            </motion.li>
            {ready &&
              t("headerLinksElse", { returnObjects: true }).map(link => (
                <li key={link.category}>
                  <AniLink
                    cover
                    direction="down"
                    bg="#0D0D0D"
                    className="link-button"
                    to={`/${link.category}`}
                  >
                    <motion.span whileHover="hovering">
                      <motion.div variants={variants}>
                        <div className="anim-link top-link">
                          {link.translation}
                        </div>
                        <div className="anim-link bottom-link">
                          {link.translation}
                        </div>
                      </motion.div>
                    </motion.span>
                  </AniLink>
                </li>
              ))}
            {/* functional language switch */}
            {/* <li
            style={{ display: "none" }}
            onClick={() => {
              i18n.language === "fr"
                ? i18n.changeLanguage("en")
                : i18n.changeLanguage("fr")
            }}
          >
            LANG
          </li> */}
          </ul>
        )}
      </div>
    </StyledHeader>
  )
}

export default Header
