import React from "react"
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
