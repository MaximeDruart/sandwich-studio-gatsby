import React, { useEffect, useRef, useState } from "react"
import { Helmet } from "react-helmet"
import { graphql } from "gatsby"

import Header from "../components/Header"
import Hero from "../components/homepage/Hero"
import About from "../components/homepage/About"
import Footer from "../components/Footer"
import ContactSpinner from "../components/homepage/ContactSpinner"
import Cards from "../components/homepage/Cards"
import SelectedWorks from "../components/homepage/SelectedWorks"
import useStore from "../../store"
import { useMediaQuery } from "react-responsive"
import SelectedPopup from "../components/homepage/SelectedPopup"
import LeadMagnet from "../components/homepage/LeadMagnet"

import "../global.css"

export default function Home({ location }) {
  const mainContainerRef = useRef(null)
  const [scroll, setScroll] = useState(null)
  const canvasLoadStatus = useStore(state => state.canvasLoadStatus)
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" })

  useEffect(() => {
    if (mainContainerRef.current) {
      // condition rempli seulement sur la home
      if (canvasLoadStatus.progress >= 100) {
        import("locomotive-scroll").then(LocomotiveScroll => {
          const Loco = LocomotiveScroll.default
          // le timeout est juste pour attendre la fin de l'anim de chargement
          setTimeout(() => {
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
          }, 1600)
        })
      }
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
        <title>Sandwich Studio - Agence créative à Paris</title>
        <meta
          name="description"
          content="Du logo à la création de votre site web, on vous accompagne dans votre transformation digitale et vos communications multi-supports."
        ></meta>
        <meta
          name="facebook-domain-verification"
          content="28rdw927c9t60caque6wzoc3k4mn3b"
        />
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
        {/* <CanCanvas scroll={scroll} /> */}
        <Hero />
        <About />
        <Cards></Cards>
        <SelectedWorks filterby="all" />
        <SelectedPopup />
        <LeadMagnet />
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
