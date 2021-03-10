import React, { useEffect, useRef, useState } from "react"
import { Helmet } from "react-helmet"

import Header from "../components/Header"
import Hero from "../components/homepage/Hero"
import About from "../components/homepage/About"
import Services from "../components/homepage/Services"
import Footer from "../components/Footer"
import ContactSpinner from "../components/homepage/ContactSpinner"
import SelectedWorks from "../components/homepage/SelectedWorks"
import useStore from "../../store"

export default function Home() {
  const mainContainerRef = useRef(null)
  const [scroll, setScroll] = useState(null)
  const canvasLoadStatus = useStore(state => state.canvasLoadStatus)

  useEffect(() => {
    // sadly this is kind of the best solution to stop the user from scrolling on load time AND hide scrollbar during the time
    // where locomotivescroll isnt dynamically loaded yet
    if (canvasLoadStatus.progress < 100) {
      document.body.style.overflow = "hidden"
      document.body.style.position = "fixed"
    } else {
      // gosh look away pls
      setTimeout(() => {
        document.body.style.overflow = "initial"
        document.body.style.position = "static"
      }, 300)
    }
  }, [canvasLoadStatus])

  useEffect(() => {
    if (mainContainerRef.current) {
      import("locomotive-scroll").then(LocomotiveScroll => {
        let s = new LocomotiveScroll.default()
        s.smooth = true
        s.init()
        s.scrollbarContainer = mainContainerRef.current
        s.el = mainContainerRef.current
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
        <ContactSpinner />
        <Hero />
        <About />
        <Services scroll={scroll} />
        <SelectedWorks />
      </main>
      <Footer />
    </>
  )
}
