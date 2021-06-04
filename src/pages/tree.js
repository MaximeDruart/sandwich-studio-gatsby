import React, { useEffect, useRef, useState } from "react"
import { Helmet } from "react-helmet"
import { graphql } from "gatsby"

import Header from "../components/Header"
import Footer from "../components/Footer"
import useStore from "../../store"
import Container from "../components/tree/Container"
import Button from "../components/tree/Button"
import { useMediaQuery } from "react-responsive"

export default function Home({ location }) {
  const mainContainerRef = useRef(null)
  const [scroll, setScroll] = useState(null)
  const canvasLoadStatus = useStore(state => state.canvasLoadStatus)
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" })

  useEffect(() => {
    if (mainContainerRef.current) {
      if (canvasLoadStatus.progress >= 100) {
        import("locomotive-scroll").then(LocomotiveScroll => {
          const Loco = LocomotiveScroll.default
          // waiting for the animation to be done
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
        <title>Sandwich Studio</title>
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
          <Container>
            <img src="images/logo-black.png"></img>
            <Button target={"/"} fullWidth>Notre site web</Button>
            <Button target={"/contact"} fullWidth>Obtenir un devis</Button>
            <Button target={"/contact"} fullWidth>Télecharger la to-do list pour booster votre activité</Button>
            <Button target={"https://www.instagram.com/sandwich.std/?hl=fr"} fullWidth>Instagram</Button>
          </Container>
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
