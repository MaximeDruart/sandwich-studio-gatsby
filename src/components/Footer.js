import React from "react"
import styled from "styled-components"
import { graphql,StaticQuery } from "gatsby"
import AniLink from "gatsby-plugin-transition-link/AniLink"

const StyledFooter = styled.div`
  background: #151515;
  width: 100vw;
  padding: 20px max(5vw, 40px) 50px max(5vw, 40px);
  margin-top: 30vh;

  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  ${({ theme }) => theme.textStyles.smallText};

  .left {
    display: flex;
    flex-flow: column nowrap;
    align-items: baseline;
    justify-content: space-between;
    .at {
    }
    .contact {
      display: flex;
      .email {
        margin-right: max(1.5vw, 15px);
      }
    }
  }
  .right {
    text-align: right;

    .privacy {
      position: relative;
      margin-right: 30px;
      &:after {
        content: "";
        position: absolute;
        right: -15px;
        width: 2px;
        background: white;
        height: 100%;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
  @media (max-width: 600px) {
    height: 20vh;
    flex-flow: column nowrap;
    justify-content: space-around;
    .left {
    }
    .right {
      display: flex;
      text-align: left;
      .privacy {
        width: 35%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .creator-tag {
        width: 65%;
      }
    }
  }
`

const Footer = () => {
  return (
    <StyledFooter>
      <div className="left">
        <span className="at">@sandwich.studio 2021</span>
        <div className="contact">
          <a className="email" href="mailto:contact@sandwichstudio.fr">
            <img src="/images/email-icon.png" alt="link to email" />
          </a>
          <a className="insta" href="https://www.instagram.com/sandwich.std">
            <img src="/images/insta-icon.png" alt="link to email" />
          </a>
        </div>
      </div>
      <div className="right">
      <ul>
        <StaticQuery
        query={graphql`
        query{
          strapiMenufooter {
            menulink {
              url
              anchor
            }
          }
        }
        `}
        render={data => (
          data.strapiMenufooter.menulink.map((item,index)=>(
            <li key={index}>
              <AniLink 
                cover
                direction="down"
                bg="#0D0D0D"
                className="cta-button"
                to={item.url}
                >
                  {item.anchor}
              </AniLink>
            </li>
          ))
        )}
      />
    </ul>
      </div>
    </StyledFooter>
  )
}

export default Footer
