import React from "react"
import styled from "styled-components"
import { useTranslation } from "gatsby-plugin-react-i18next"
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
    margin-top: 50px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 40px;
  }
  .container .card:nth-child(4) {
    grid-column: 1 / 3;
  }

  @media (max-width: 1200px) {
    .container {
      grid-template-columns: 1fr 1fr;
    }
    .container .card:nth-child(4) {
      grid-column: unset;
    }
    .blob {
      display: none;
    }
  }
  @media (max-width: 700px) {
    .container {
      grid-template-columns: 1fr;
    }
  }

  .blob {
    width: 100%;
    height: 100%;
    img {
      width: 100%;
    }
  }

  .card {
    border: 2px solid #1f1f1f;
    border-radius: 20px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .card-header {
      padding: 20px;
      background: #1f1f1f;
      h3 {
        font-size: 32px;
        margin-bottom: 10px;
      }
    }
    .card-features {
      padding: 20px;
      padding-left: 40px;
      list-style: disc;
      li {
        padding: 5px 0;
        line-height: 1.5;
      }
    }
    .card-footer {
      padding: 20px;
      display: flex;
      flex-direction: column;
      .price {
        color: #ffb23e;
        font-size: 32px;
        margin-top: 5px;
        margin-bottom: 20px;
      }
      .cta-button {
        ${({ theme }) => theme.textStyles.button};
        color: black;
      }
    }
  }
`

const Cards = () => {
  const { t } = useTranslation()

  return (
    <StyledAbout id="about">
      <div className="headline">
        {t("web-headline-2")} • {t("web-headline-2")} • {t("web-headline-2")}
      </div>
      <div className="container">
        {t("web-cards", { returnObjects: true }).map((card, index) => (
          <Card
            key={card.title + index}
            index={card.title + index}
            title={card.title}
            description={card.description}
            content={
              <ul key={card.title + index} className="card-features">
                {card.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            }
            priceintro={card.priceintro}
            price={card.price}
            leadtime={card.leadtime}
            cta="Obtenir un devis"
          ></Card>
        ))}
        <div className="blob">
          <img src="/images/blob.png" alt=""></img>
        </div>
      </div>
    </StyledAbout>
  )
}

export default Cards
