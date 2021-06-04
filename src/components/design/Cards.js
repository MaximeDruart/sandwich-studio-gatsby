import React from "react"
import styled from "styled-components"
import { useTranslation } from "gatsby-plugin-react-i18next"
import { useMediaQuery } from "react-responsive"
import Card from "../misc/Card"

const StyledAbout = styled.div`
  width: 100vw;

  padding: 5vh max(5vw, 40px) 0 max(5vw, 40px);

  * {
    font-family: NeueMontrealRegular;
    color: ${({ theme }) => theme.colors.text};
  }

  .headline {
    ${({ theme }) => theme.textStyles.headline};
    white-space: nowrap;
    width: 100%;
  }

  .container {
      margin-top:50px;
      display:grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-gap:40px;
  }
  .container .card:nth-child(4){
    grid-column: 1 / 3;
  }

  @media (max-width: 1200px){
    .container{
      grid-template-columns: 1fr 1fr;
    }
    .container .card:nth-child(4){
      grid-column: unset;
    }
  }
  @media (max-width: 700px){
    .container{
      grid-template-columns: 1fr;
    }
  }
  }

  .card{
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
  }
`

const Cards = () => {
  const { t } = useTranslation()
  const isMobile = useMediaQuery({ query: "(max-width: 600px)" })

  return (
    <StyledAbout id="about" data-scroll-section>
      <div
        data-scroll
        data-scroll-direction="horizontal"
        data-scroll-speed="7"
        className="headline"
      >
        {t("design-headline-2")} • {t("design-headline-2")} • {t("design-headline-2")}
      </div>
        <div className="container">
            {
            t("design-cards", { returnObjects: true }).map(
                (card, index) => (
                  <Card
                    key={index}
                    index={card.title + index}
                    title={card.title}
                    description={card.description}
                    content={
                      <ul className="card-features">
                          {card.features.map((feature,index)=>
                          <li>{feature}</li>
                          )}
                      </ul>}
                    priceintro={card.priceintro}
                    price={card.price}
                    leadtime={card.leadtime}
                    cta="Obtenir un devis"
                  ></Card>
                )
            )}
        </div>
    </StyledAbout>
  )
}

export default Cards
