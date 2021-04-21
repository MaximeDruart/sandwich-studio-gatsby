import React from "react"
import styled from "styled-components"
import { useTranslation } from "gatsby-plugin-react-i18next"
import { useMediaQuery } from "react-responsive"

const StyledCard = styled.div`

  * {
    font-family: NeueMontrealRegular;
    color: ${({ theme }) => theme.colors.text};
  }

    border: 2px solid #1F1F1F;
    border-radius:20px;
    overflow:hidden;
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    .card-header{
        padding:20px;
        background:#1F1F1F;
        h3{
        font-size:32px;
        margin-bottom:10px;
        }
    }
    .card-features{
        padding:20px;
        padding-left:40px;
        list-style: disc;
        li{
            padding: 5px 0;
            line-height:1.5;
        }
    }
    .card-footer{
        padding:20px;
        display:flex;
        flex-direction:column;
        .price{
            color:#FFB23E;
            font-size:32px;
            margin-top:5px;
            margin-bottom:20px;
        }
        .cta-button{
        ${({ theme }) => theme.textStyles.button};
        color:black;
        }
    }
`

const Card = ({index,title,description,content,priceintro,price,leadtime,cta}) => {
  const { t } = useTranslation()
  const isMobile = useMediaQuery({ query: "(max-width: 600px)" })

  return (
    <StyledCard key={index}>
        <div>
            <div className="card-header">
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
            <div className="card-content">
                {content}
            </div>
        </div>
        <div className="card-footer">
                <span className="price-intro">{priceintro}</span>
                <span className="price">{price}</span>
                <span>{leadtime}</span>
                <a className="cta-button" href="#">{cta}</a>
        </div>
    </StyledCard>
  )}

export default Card
