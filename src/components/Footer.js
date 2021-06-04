import { Link } from "gatsby"
import React from "react"
import { useTranslation } from "gatsby-plugin-react-i18next"
import styled from "styled-components"
import AniLink from "gatsby-plugin-transition-link/AniLink"

const StyledFooter = styled.div`
  background: #151515;
  width: 100vw;
  height: 10vh;
  padding: 0 max(5vw, 40px) 0 max(5vw, 40px);
  margin-top: 30vh;

  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  ${({ theme }) => theme.textStyles.smallText};

  .left {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
    .at {
    }
    .contact {
      margin-left: 30px;
      display: flex;
      .email {
        margin-right: max(1.5vw, 15px);
      }
    }
  }
  .right {
    text-align: right;

    .privacy {
      position: relative;
      margin-right: 30px;
      &:after {
        content: "";
        position: absolute;
        right: -15px;
        width: 2px;
        background: white;
        height: 100%;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
  @media (max-width: 600px) {
    height: 20vh;
    flex-flow: column nowrap;
    justify-content: space-around;
    .left {
    }
    .right {
      display: flex;
      text-align: left;
      .privacy {
        width: 35%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .creator-tag {
        width: 65%;
      }
    }
  }
`

const Footer = () => {
  const { t } = useTranslation()
  return (
    <StyledFooter data-scroll-section>
      <div className="left">
        <span className="at">@sandwich.studio 2021</span>
        <div className="contact">
          <a className="email" href="mailto:contact@sandwichstudio.fr">
            <img src="/images/email-icon.png" alt="link to email" />
          </a>
          <a className="insta" href="https://www.instagram.com/sandwich.std">
            <img src="/images/insta-icon.png" alt="link to email" />
          </a>
        </div>
      </div>
      <div className="right">
        <AniLink
          cover
          direction="down"
          bg="#0D0D0D"
          className="link-button"
          to={`/web`}
          style={{ display: "none" }}
          className="privacy"
          to="/privacy-policy"
        >
          {t("footer-privacy-policy")}
        </AniLink>
        <span className="creator-tag">{t("footer-creator-tag")}</span>
      </div>
    </StyledFooter>
  )
}

export default Footer
