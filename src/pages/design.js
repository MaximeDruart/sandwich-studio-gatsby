import React, { useEffect, useRef, useState } from "react"
import { Helmet } from "react-helmet"
import { graphql } from "gatsby"

import Header from "../components/Header"
import Footer from "../components/Footer"
import useStore from "../../store"
import SelectedWorks from "../components/homepage/SelectedWorks"
import SelectedPopup from "../components/homepage/SelectedPopup"
import DoubleImageText from "../components/misc/DoubleImageText"
import Cards from "../components/design/Cards"
import Forms from "../components/contact/Forms"
import { useMediaQuery } from "react-responsive"

export default function Home({ location }) {
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

        s.update()
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
      }, 400)
    }
  }, [scroll])

  return (
    <>
      <Helmet>
        <title>Votre identité visuelle par Sandwich Studio</title>
        <meta
          name="description"
          content="Créons un logo et une identité visuelle professionelle et reconnaissable par vos clients. Mettons en valeur les atouts et valeurs de votre marque."
        ></meta>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="preload"
          href="/fonts/neueRegular.otf"
          as="font"
          crossOrigin=""
        />
      </Helmet>

      <Header location={location} scroll={scroll} />

      <main data-scroll-container ref={mainContainerRef}>
        <DoubleImageText
          headline={"design-headline"}
          imageFront={"/images/design-1.jpg"}
          imageBack={"/images/design-2.jpg"}
          title={"design-1-title"}
          body={"design-1-body"}
        />
        <Cards />
        <SelectedWorks filterby="design" />
        <SelectedPopup />
        <Forms location={location} />
        <Footer />
      </main>
    </>
  )
}

export const query = graphql`
  query($language: String!) {
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
