import React, { useState } from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import { ReactComponent as Logo } from "../../assets/icons/header-logo.svg"
import { motion, useTransform } from "framer-motion"
import { useTranslation } from "react-i18next"

const StyledHeader = styled.div`
  * {
    font-family: NeueMontrealRegular;
    color: ${({ theme }) => theme.colors.text};
    ${({ theme }) => theme.textStyles.h6};
  }
  z-index: 5;
  width: 100vw;
  height: 10vh;
  position: fixed;
  top: 0;
  padding: 0 max(5vw, 50px);

  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;

  .left {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    .logo {
      margin-right: 10px;
    }
    .logo-text {
      font-family: "BerlinBold";
    }
  }

  .right ul {
    display: flex;
    flex-flow: row nowrap;
    width: max(20vw, 250px);
    justify-content: space-between;
    li {
      position: relative;
      overflow: hidden;
      a {
        display: block;
        cursor: pointer;
        .anim-link {
          &.bottom-link {
            position: absolute;
          }
        }
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

const Header = () => {
  const [hovering, setHovering] = useState(false)
  const { t } = useTranslation()

  return (
    <StyledHeader>
      <Link to="/">
        <div className="left">
          <Logo className="logo" />
          <div className="logo-text">Sandwich.Studio</div>
        </div>
      </Link>
      <div className="right">
        <ul>
          {t("headerLinks", { returnObjects: true }).map((link, i) => (
            <li key={link}>
              <Link to={`/${link.toLowerCase()}`}>
                <motion.span whileHover="hovering">
                  <motion.div variants={variants}>
                    <div className="anim-link top-link">{link}</div>
                    <div className="anim-link bottom-link">{link}</div>
                  </motion.div>
                </motion.span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </StyledHeader>
  )
}

export default Header
