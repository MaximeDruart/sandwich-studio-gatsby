import React, { useEffect, useRef, useState } from "react"
import { Helmet } from "react-helmet"
import { graphql } from "gatsby"

import Header from "../components/Header"
import DoubleImageText from "../components/misc/DoubleImageText"
import Services from "../components/homepage/Services"
import Footer from "../components/Footer"
import ContactSpinner from "../components/homepage/ContactSpinner"
import SelectedWorks from "../components/homepage/SelectedWorks"
import useStore from "../../store"
import CanCanvas from "../components/homepage/CanCanvas"
import { useMediaQuery } from "react-responsive"
import SelectedPopup from "../components/homepage/SelectedPopup"
import Forms from "../components/contact/Forms"

import "../global.css"

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
        <title>Votre packaging sur-mesure par Sandwich Studio</title>
        <meta
          name="description"
          content="Création de packaging sur-mesure. Petite ou grosse quantité. Cartonnage, coffret, doypack ou bocal, confiez nous la création et la production de vos packaging."
        ></meta>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="preload"
          href="/fonts/neueRegular.otf"
          as="font"
          crossOrigin=""
        />
      </Helmet>

      <Header location={location} isHomepage={true} scroll={scroll} />

      <main data-scroll-container ref={mainContainerRef}>
        <ContactSpinner scroll={scroll} />
        <CanCanvas scroll={scroll} />
        <DoubleImageText
          headline={"packaging-headline"}
          imageFront={"/images/packaging-1.jpg"}
          imageBack={"/images/packaging-2.jpg"}
          title={"packaging-1-title"}
          body={"packaging-1-body"}
        />
        <Services scroll={scroll} />
        <SelectedWorks filterby="packaging" />
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
