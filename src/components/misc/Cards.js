import React,{useEffect,useState} from "react"
import styled from "styled-components"
import { useTranslation } from "gatsby-plugin-react-i18next"
import { useMediaQuery } from "react-responsive"
import Card from "../misc/Card"
import { graphql } from "gatsby"
import axios from 'axios';

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

const Cards = (targetService) => {
  const title = targetService.apiData.productcards.title
  const { t } = useTranslation()
  const isMobile = useMediaQuery({ query: "(max-width: 600px)" })
  let [apiData,setApiData] = useState([{tag:"undone",cover:[]}])
  let [isLoading,setIsLoading] = useState(true)

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(t("backend-url")+'/productcards?');
        setApiData(response.data)
        setIsLoading(false)
      } catch (error) {
      }
    }
    if(apiData[0].tag ==="undone"){
      fetchServices()
    }
  })
  

  return (
    <StyledAbout >
        <div className="container" data-scroll-section>
            {targetService.apiData.productcards.map(
                (card, index) => (
                  <Card
                    key={index}
                    index={card.title + index}
                    title={card.title}
                    description={card.subtitle}
                    content={!isLoading ?
                      <ul className="card-features">
                      {apiData[apiData.findIndex(x => x.id === card.id)].feature ? apiData[apiData.findIndex(x => x.id === card.id)].feature.map((feature,index)=>
                        <li key={index}>{feature.feature}</li>
                        ) : null}
                      </ul>
                      :null }
                    priceintro="à partir de"
                    price={card.price+"€"}
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