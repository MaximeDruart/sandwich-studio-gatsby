import React from "react"
import styled from "styled-components"
import { useTranslation } from "gatsby-plugin-react-i18next"
import { useMediaQuery } from "react-responsive"
import { Link } from "gatsby"
import AniLink from "gatsby-plugin-transition-link/AniLink"

const StyledCard = styled.div`

  * {
    font-family: NeueMontrealRegular;
    color: ${({ theme }) => theme.colors.text};
  }

    .card-upper{
        display:flex;
        flex-direction:column;
        justify-content:center;
        img{
            width:150px;
            margin:auto;
            padding:20px 10px;
        }
    }
    border: 2px solid #1F1F1F;
    border-radius:20px;
    overflow:hidden;
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    .card-header{
        text-align:center;
        padding:20px;
        h3{
        font-family: NeueMontrealBold;
        font-size:32px;
        margin-bottom:10px;
        }
        p{
          color:#a5a5a5;
        }
    }
    .card-footer{
        display:flex;
        flex-direction:column;
        .cta-button{
        ${({ theme }) => theme.textStyles.button};
        color:black;
        display:block;
        text-align:center;
        }
    }
`

const CardImage = ({index,title,description,cta,ctaurl}) => {
  const { t } = useTranslation()
  const isMobile = useMediaQuery({ query: "(max-width: 600px)" })

  return (
    <StyledCard key={index}>
        <div className="card-upper">
            <img src={"images/icon-"+index.slice(-1)+".svg"}></img>
            <div className="card-header">
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
        </div>
        <div className="card-footer">
          <AniLink 
            cover
            direction="down"
            bg="#0D0D0D"
            className="cta-button"
            to={ctaurl}
            >
              {cta}
          </AniLink>
        </div>
    </StyledCard>
  )}

export default CardImage
