import React from "react"
import styled from "styled-components"

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
    border-radius:10px;
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

const CardImage = ({index,title,description,cta,ctaurl,img}) => {

  return (
    <StyledCard key={index}>
        <div className="card-upper">
            <img alt="Service logo" src={img}></img>
            <div className="card-header">
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
        </div>
        <div className="card-footer">
          <a 
            direction="down"
            bg="#0D0D0D"
            className="cta-button"
            href={ctaurl}
            >
              {cta}
          </a>
        </div>
    </StyledCard>
  )}

export default CardImage
