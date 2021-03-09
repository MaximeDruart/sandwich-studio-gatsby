import React, { useEffect, useRef, useState } from "react"
import { Helmet } from "react-helmet"
import LocomotiveScroll from "locomotive-scroll"

import Header from "../components/Header"
import Hero from "../components/homepage/Hero"
import About from "../components/homepage/About"
import Services from "../components/homepage/Services"
import Footer from "../components/Footer"

export default function Home() {
  const mainContainerRef = useRef(null)
  const [scroll, setScroll] = useState(null)

  useEffect(() => {
    if (mainContainerRef.current) {
      // wierd stuff but we cant import this at the top level as this package can only run client side (needs access to window / document)
      let s = new LocomotiveScroll()
      s.smooth = true
      s.init()
      setScroll(s)
    }
    return () => scroll && scroll.destroy()
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
        <Hero />
        <About />
        <Services scroll={scroll} />
      </main>
      <Footer />
    </>
  )
}
