import React from "react"
import { graphql } from "gatsby"
import loadable from '@loadable/component'
import Header from "../../components/Header"
import getComponentFromApi from "../../components/misc/getComponentFromApi"
import Footer from "../../components/Footer"
import Seo from "../../components/misc/Seo"
import Loco from "../../components/misc/Loco"
export default function Service(props) {
  return(
    <>
      <Seo
        title={props.data.strapiPageprojects.metatitle}
        description={props.data.strapiPageprojects.metadesc}
        article={false}>
      </Seo>
      <Header location={props.location}/>
      <Loco>
        <main>
          {props.data.strapiPageprojects.main.map((item,index) => {
            const Component = loadable(() => import('../../components/misc/'+getComponentFromApi(item)))
            return (
                <Component data-scroll-section location={props.location} key={index} apiData={item} />
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
    strapiPageprojects(id: { eq: $id }) {
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