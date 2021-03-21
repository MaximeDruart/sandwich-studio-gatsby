import React, { useEffect, useRef, useState } from "react"
import { Helmet } from "react-helmet"
import { graphql } from "gatsby"

import Header from "../components/Header"
import Hero from "../components/homepage/Hero"
import About from "../components/homepage/About"
import Services from "../components/homepage/Services"
import Footer from "../components/Footer"
import ContactSpinner from "../components/homepage/ContactSpinner"
import SelectedWorks from "../components/homepage/SelectedWorks"
import useStore from "../../store"
import CanCanvas from "../components/homepage/CanCanvas"
import Forms from "../components/homepage/Forms"

export default function Home() {
  const mainContainerRef = useRef(null)
  const [scroll, setScroll] = useState(null)
  const canvasLoadStatus = useStore(state => state.canvasLoadStatus)

  useEffect(() => {
    // sadly this is kind of the best solution to stop the user from scrolling on load time AND hide scrollbar during the time
    // where locomotivescroll isnt dynamically loaded yet
    if (canvasLoadStatus.progress < 100) {
      document.body.style.position = "fixed"
    } else {
      document.body.style.position = "static"
    }
  }, [canvasLoadStatus])

  useEffect(() => {
    if (mainContainerRef.current) {
      import("locomotive-scroll").then(LocomotiveScroll => {
        let s = new LocomotiveScroll.default()
        // s.el = mainContainerRef.current
        // s.scrollbarContainer = mainContainerRef.current
        s.smooth = true
        s.tablet = {
          smooth: true,
        }
        s.smartphone = {
          smooth: true,
        }
        s.init()
        setScroll(s)
      })
    }
    return () => scroll && scroll.destroy()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mainContainerRef])

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

      <Header />

      <main data-scroll-container ref={mainContainerRef}>
        hey
        <ContactSpinner />
        <CanCanvas scroll={scroll} />
        <Hero />
        <About />
        <Services scroll={scroll} />
        <SelectedWorks />
        <Forms />
      </main>
      <Footer />
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
