import React,{useEffect,useState} from "react"
import styled from "styled-components"
import { useTranslation } from "gatsby-plugin-react-i18next"
import Card from "../misc/Card"
import axios from 'axios';
import ReactPlaceholder from 'react-placeholder';
import "react-placeholder/lib/reactPlaceholder.css";

const StyledAbout = styled.div`
  width: 100vw;

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
      width: 80%;
      margin-left: auto;
      margin-right: auto;
      margin-top:50px;
      display:grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-gap:40px;
  }
  .container .card:nth-child(4){
    grid-column: 1 / 3;
  }

  @media (max-width: 1200px){
    padding: 5vh max(5vw, 40px) 0 max(5vw, 40px);
    .container{
      width:100%;
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
  .text-block{
    margin-top:20px;
    padding:0 20px;
  }
  .text-row{
    background-color:#1b1b1b !important;
  }
`

const Cards = (targetService) => {
  const { t } = useTranslation()
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
        <div className="container" >
            {targetService.apiData.productcards.map(
                (card, index) => (
                  <Card
                    index={card.title + index}
                    title={card.title}
                    description={card.subtitle}
                    key={index}
                    content={
                      <ReactPlaceholder type='text' rows={7} ready={!isLoading} showLoadingAnimation={true} color="#232323">
                        {!isLoading ? (
                          <ul className="card-features">
                          {apiData[apiData.findIndex(x => x.id === card.id)].feature ? apiData[apiData.findIndex(x => x.id === card.id)].feature.map((feature,id)=>
                            <li key={id}>{feature.feature}</li>
                            ) : null}
                          </ul>
                        ): null}
                      </ReactPlaceholder>
                      }
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