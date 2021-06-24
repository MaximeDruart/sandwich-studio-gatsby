import React from "react"
import { Helmet } from "react-helmet"
import { graphql } from "gatsby"
import Header from "../components/Header"
import Footer from "../components/Footer"
import Container from "../components/tree/Container"
import Button from "../components/tree/Button"
export default function Home(props) {
  return (
    <>
      <Helmet>
        <title>Sandwich Studio</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="preload"
          href="/fonts/neueRegular.otf"
          as="font"
          crossOrigin=""
        />
      </Helmet>
      <Header location={props.location}/>
      <main>
        <Container>
          <img alt="Sandwich Studio logo" src="/images/logo-black.png"></img>
          {props.data.strapiPagetree.link.map((item,index) =>(
            <Button target={item.url} fullWidth>
            {item.anchor}
            </Button>
          ))}
        </Container>
        <Footer />
      </main>
    </>
  )
}
export const query = graphql`
  query($language: String!) {
    strapiPagetree {
      id
      link {
        id
        anchor
        url
      }
    }
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`
