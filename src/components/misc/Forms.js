import React from "react"
import { useTranslation } from "gatsby-plugin-react-i18next"
import styled from "styled-components"
import FormCallback from "../contact/FormCallback"
import FormContact from "../contact/FormContact"

const StyledForms = styled.div`
  width: 100vw;
  /* overflow: hidden; */

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
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: flex-start;
  }

  @media (max-width: 1200px) {
    .forms {
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
      <div className="forms">
        <FormContact location={location} scroll={scroll} />
        <FormCallback />
      </div>
    </StyledForms>
  )
}

export default Forms
