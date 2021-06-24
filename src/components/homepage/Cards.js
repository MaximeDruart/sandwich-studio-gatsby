import React, {useEffect,useState} from "react"
import styled from "styled-components"
import { useTranslation } from "gatsby-plugin-react-i18next"
import CardImage from "../misc/CardImage"

const StyledAbout = styled.div`
  width: 100vw;

  padding: 5vh max(5vw, 40px) 0 max(5vw, 40px);
  margin-bottom:10vh;

  * {
    font-family: NeueMontrealRegular;
    color: ${({ theme }) => theme.colors.text};
  }
  .container {
      display:grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
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

const Cards = ({services}) => {
  const { t } = useTranslation()
  const [servicesData,setServicesData] = useState([0,1,2])

  useEffect(() => {
    if(services != null && services.length > 0){
      setServicesData(services)
    }
  },[services])

  return (
    <StyledAbout id="about">
        <div className="container">
            {
            servicesData.map(
                (card, index) => (
                  <CardImage
                    key={index}
                    index={card.title + index}
                    title={card.title}
                    img={t("images-url")+(card.img != null ? card.img.url : null)}
                    description={card.body}
                    cta={card.targetAnchor}
                    ctaurl={card.target}
                  ></CardImage>
                )
            )}
        </div>
    </StyledAbout>
  )
}

export default Cards
