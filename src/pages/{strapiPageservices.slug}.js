import React from "react"
import { graphql } from "gatsby"
import loadable from '@loadable/component'
import Header from "../components/Header"
import getComponentFromApi from "../components/misc/getComponentFromApi"
import Footer from "../components/Footer"
import Seo from "../components/misc/Seo"
import Loco from "../components/misc/Loco"
export default function Service(props) {
  return(
    <>
      <Seo
        title={props.data.strapiPageservices.metatitle}
        description={props.data.strapiPageservices.metadesc}
        article={false}>
      </Seo>
      <Header location={props.location} />
      <Loco>
        <main>
          {props.data.strapiPageservices.main.map((item,index) => {
            const Component = loadable(() => import('../components/misc/'+getComponentFromApi(item)))
            return (
                <Component location={props.location} key={index} apiData={item} />
            )
          })}
          <Footer />
        </main>
      </Loco>
    </>
  )
}
export const query = graphql`
  query($id: String,$language: String!) {
    strapiPageservices(id: { eq: $id }) {
        id
        slug
        metatitle
        metadesc
        main
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