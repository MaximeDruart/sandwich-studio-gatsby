import React from "react"
import { useTranslation } from "react-i18next"
import styled from "styled-components"
import FormContact from "./FormContact"

const StyledForms = styled.div`
  border: 1px solid yellow;
  width: 100vw;
  margin-top: 30vh;
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
    margin-bottom: 8vh;
  }

  .forms {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: flex-start;
  }
`

const Forms = () => {
  const { t } = useTranslation()
  return (
    <StyledForms data-scroll data-scroll-section>
      <div
        data-scroll
        data-scroll-direction="horizontal"
        data-scroll-speed="9"
        className="headline"
      >
        {t("forms-headline")}
      </div>
      <div className="forms">
        <FormContact />
        <FormContact />
      </div>
    </StyledForms>
  )
}

export default Forms
