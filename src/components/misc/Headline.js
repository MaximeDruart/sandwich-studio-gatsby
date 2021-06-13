import React from "react"
import styled from "styled-components"
import { useTranslation } from "gatsby-plugin-react-i18next"
import { useMediaQuery } from "react-responsive"

const StyledHeadline = styled.p`
  color: white;
  ${({ theme }) => theme.textStyles.headline};
  white-space: nowrap;
  width: 100%;
  margin-top: 4vh;
`

const Headline = ({title,apiData}) => {
  const { t } = useTranslation()
  if(apiData){
    title = apiData.title
  }

  return (
    <div data-scroll-section>
      <StyledHeadline
      className="headline"
      data-scroll
      data-scroll-direction="horizontal"
      data-scroll-speed="7">
          {title} • {title} • {title} • {title} 
      </StyledHeadline>
    </div>
  )}

export default Headline
