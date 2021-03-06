import React from "react"
import styled from "styled-components"
const StyledHeadline = styled.p`
  color: white;
  ${({ theme }) => theme.textStyles.headline};
  white-space: nowrap;
  width: 100%;
  margin-top: 4vh;
`
const Headline = ({title,apiData}) => {
  if(apiData){
    title = apiData.title
  }
  return (
    <div>
      <StyledHeadline
      data-scroll
      data-scroll-direction="horizontal"
      data-scroll-speed="7"
      className="headline">
          {title} • {title} • {title} • {title}  • {title}  • {title}  • {title}  • {title}  • {title} 
      </StyledHeadline>
    </div>
  )}
export default Headline
