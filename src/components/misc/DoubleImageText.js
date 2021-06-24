import React,{useEffect} from "react"
import styled from "styled-components"
import { useTranslation } from "gatsby-plugin-react-i18next"
import { useMediaQuery } from "react-responsive"
import parse from 'html-react-parser';
import PlaceHolder from '../misc/imagePlaceholder';

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

  .about-section {
    display: flex;
    flex-flow: ${props => props.isReverse ? "row-reverse" : "row"} nowrap;
    justify-content: space-around;
    align-items:center;
    width: 80vw;
    margin: auto;
    .images{  
      position: relative;
      width: 450px;
      height: 450px;
      .photo {
        width: 30%;
        position: absolute;
        width: 450px;
        height: 450px;
      }
      .photo-front{
        position:absolute;
        top:30%;
        left: ${props=> props.isReverse ? "30%" : "-30%"};
      }
    }
    .text {
      ${props => props.isReverse ? "margin-right:20px;" : "margin-left:20px;"}
      width: max(40%, 400px);
      text-align: ${props => props.isReverse ? "left" : "right"};
      .title {
        ${({ theme }) => theme.textStyles.h2};
      }
      .desc {
        margin-top:10px;
        ${({ theme }) => theme.textStyles.text};
      }
    }
    @media (max-width: 1000px) {
      * {
        text-align: center;
      }
      flex-flow: column;

      /* align-items: center; */
      .images {
        width: 240px;
        height: 240px;
        .photo {
          width: 240px;
          height: 240px;
          &:first-child{
            top: 100px;
            right:90px;
          }
        }
      }
      .text {
        width: 100%;
        text-align: center;
        margin-top:50px;
      }
    }
  }
`

const DoubleImageText = ({headline,imageFront,imageBack,title,body,reverse,apiData}) => {
  const { t } = useTranslation()
  headline = t(headline)
  const isMobile = useMediaQuery({ query: "(max-width: 1000px)" })

  if(apiData){
    headline=apiData.headline
    imageFront =apiData.images[0].formats.medium ? apiData.images[0].formats.medium.url : apiData.images[0].url
    imageBack =apiData.images[1].formats.medium ? apiData.images[1].formats.medium.url : apiData.images[1].url
    title=apiData.title
    body=apiData.content
    reverse=apiData.isreverse
  }
  return (
    <StyledAbout id="about" imgFront={imageFront} imgBack={imageBack} isReverse={reverse}>
      <div className="our-mission about-section">
        <div className="images">
          <div
            data-scroll
            data-scroll-speed={2}
          >
            <PlaceHolder
              width={isMobile ? "240px" : "450px"}
              height={isMobile ? "240px" : "450px"}
              src={imageBack}
              absolute
            ></PlaceHolder>
          </div>
          <div
            className="photo-front"
            data-scroll
            data-scroll-speed={4}
          >
            <PlaceHolder
              width={isMobile ? "240px" : "450px"}
              height={isMobile ? "240px" : "450px"}
              src={imageFront}
              absolute
            ></PlaceHolder>
          </div>
        </div>
        <div className="text">
          <h1 className="title">{t(title)}</h1>
          <div className="desc">{parse(t(body))}</div>
        </div>
      </div>
    </StyledAbout>
  )
}

export default DoubleImageText
