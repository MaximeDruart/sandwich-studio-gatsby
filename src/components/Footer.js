import { Link } from "gatsby"
import React from "react"
import { useTranslation } from "react-i18next"
import styled from "styled-components"

const StyledFooter = styled.div`
  background: #151515;
  width: 100vw;
  height: 10vh;
  padding: 0 max(5vw, 20px) 0 max(5vw, 20px);

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
    width: 23vw;
    .at {
    }
    .contact {
      .email {
        margin-right: max(2.5vw, 25px);
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
`

const Footer = () => {
  const { t } = useTranslation()
  return (
    <StyledFooter>
      <div className="left">
        <span className="at">@sandwich.studio 2021</span>
        <div className="contact">
          <a className="email" href="mailto:someone@yoursite.com">
            <img src="/images/email-icon.png" alt="link to email" />
          </a>
          <a className="insta" href="instagram.com">
            <img src="/images/insta-icon.png" alt="link to email" />
          </a>
        </div>
      </div>
      <div className="right">
        <Link className="privacy" to="/privacy-policy">
          {t("footer-privacy-policy")}
        </Link>
        <span className="creator-tag">{t("footer-creator-tag")}</span>
      </div>
    </StyledFooter>
  )
}

export default Footer
