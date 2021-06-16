import React from "react"
import { useTranslation } from "gatsby-plugin-react-i18next"
import styled from "styled-components"
import FormCallback from "./FormCallback"
import FormContact from "./FormContact"

const StyledForms = styled.div`
  width: 100vw;
  /* overflow: hidden; */
  margin-top: 10vh;

  padding: 5vh max(10vw, 30px) 0 max(10vw, 30px);

  * {
    font-family: NeueMontrealRegular;
    color: ${({ theme }) => theme.colors.text};
  }

  .headline {
    ${({ theme }) => theme.textStyles.headline};
    white-space: nowrap;
    width: 100%;
    margin-bottom: 8vh;
  }

  .forms {
    display:grid;
    grid-template-columns: 1fr 1fr;
    grid-gap:40px;
  }

  @media (max-width: 1200px) {
    .forms {
      display:flex;
      flex-flow: column nowrap;
      align-items: center;
    }
  }
  @media (max-width: 600px) {
    .forms {
    }
  }
`

const Forms = ({ scroll, location }) => {
  const { t } = useTranslation()

  return (
    <StyledForms id="contact" data-scroll-section>
      <div
        data-scroll
        data-scroll-direction="horizontal"
        data-scroll-speed="9"
        className="headline"
      >
        {t("forms-headline")} • {t("forms-headline")} • {t("forms-headline")}
      </div>
      <div className="forms">
        <FormContact location={location} scroll={scroll} />
        <FormCallback />
      </div>
    </StyledForms>
  )
}

export default Forms
