import React,{useEffect,useRef,useState} from "react"
import { graphql } from "gatsby"
import { Helmet } from "react-helmet"
import loadable from '@loadable/component'

import Header from "../components/Header"
import getComponentFromApi from "../components/misc/getComponentFromApi"
import Footer from "../components/Footer"
import useStore from "../../store"
import { useMediaQuery } from "react-responsive"

export default function Service(props) {
  const mainContainerRef = useRef(null)
  const [scroll, setScroll] = useState(null)
  const canvasLoadStatus = useStore(state => state.canvasLoadStatus)
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" })

  useEffect(() => {
    if (mainContainerRef.current) {
      import("locomotive-scroll").then(LocomotiveScroll => {
        const Loco = LocomotiveScroll.default
        // waiting for the animation to be done
        const s = new Loco({
          smooth: true,
          el: mainContainerRef.current,
          tablet: { smooth: true },
          smartphone: { smooth: true },
          reloadOnContextChange: true,
          lerp: isTablet ? 0.1 : 0.1,
        })
        setScroll(s)
      })
    }
    return () => scroll && scroll.destroy()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvasLoadStatus, mainContainerRef])

  useEffect(() => {
    if (scroll) {
      setTimeout(() => {
        scroll.update()
      }, 1500)
    }
  }, [scroll])

  return(
<>
      <Helmet>
        <title>
        {props.data.strapiPageservices.metatitle}
        </title>
        <meta
          name="description"
          content={props.data.strapiPageservices.metadesc}
        ></meta>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="preload"
          href="/fonts/neueRegular.otf"
          as="font"
          crossOrigin=""
        />
      </Helmet>

      <Header location={props.location} scroll={scroll} />

      <main data-scroll-container scroll={scroll} ref={mainContainerRef}>
        {props.data.strapiPageservices.main.map((item,index) => {
          const Component = loadable(() => import('../components/misc/'+getComponentFromApi(item)))
          return (
              <Component location={props.location} key={index} apiData={item} />
          )
        })}
        <Footer />
      </main>
    </>
  )
}
  
// This is the page query that connects the data to the actual component. Here you can query for any and all fields
// you need access to within your code. Again, since Gatsby always queries for `id` in the collection, you can use that
// to connect to this GraphQL query.
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