import React, { useEffect, useRef, useState } from "react"
import { Helmet } from "react-helmet"
import { graphql } from "gatsby"

import Header from "../components/Header"
import Footer from "../components/Footer"
import useStore from "../../store"
import SelectedWorks from "../components/homepage/SelectedWorks"
import SelectedPopup from "../components/homepage/SelectedPopup"
import About from "../components/marketing/About"
import Cards from "../components/marketing/Cards"
import Forms from "../components/contact/Forms"
import { useMediaQuery } from "react-responsive"

export default function Home({ location }) {
  const mainContainerRef = useRef(null)
  const [scroll, setScroll] = useState(null)
  const canvasLoadStatus = useStore(state => state.canvasLoadStatus)
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" })

  useEffect(() => {
    // sadly this is kind of the best solution to stop the user from scrolling on load time AND hide scrollbar during the time
    // where locomotivescroll isnt dynamically loaded yet
    if (canvasLoadStatus.progress === 100) {
      document.body.style.position = "static"
      if (scroll) scroll.update()
    }
  }, [scroll, canvasLoadStatus])

  useEffect(() => {
    if (mainContainerRef.current) {
      import("locomotive-scroll").then(LocomotiveScroll => {
        const Loco = LocomotiveScroll.default
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
  }, [mainContainerRef])

  return (
    <>
      <Helmet>
        <title>Marketing digital - Sandwich Studio</title>
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
        <About />
        <Cards />
        <SelectedWorks filterby="marketing" />
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
