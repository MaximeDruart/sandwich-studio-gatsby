import React, { useEffect, useRef, useState } from "react"
import { Helmet } from "react-helmet"
import { graphql } from "gatsby"

import Header from "../components/Header"
import Footer from "../components/Footer"
import useStore from "../../store"
import Container from "../components/tree/Container"
import Button from "../components/tree/Button"
import { useMediaQuery } from "react-responsive"

export default function Home(props) {
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
        <title>Sandwich Studio</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="preload"
          href="/fonts/neueRegular.otf"
          as="font"
          crossOrigin=""
        />
      </Helmet>

      <Header location={props.location} scroll={scroll} />

      <main data-scroll-container ref={mainContainerRef}>
        <Container>
          <img alt="Sandwich Studio logo" src="/images/logo-black.png"></img>
          {props.data.strapiPagetree.link.map((item,index) =>(
            <Button target={item.url} fullWidth>
            {item.anchor}
            </Button>
          ))}
        </Container>
        <Footer />
      </main>
    </>
  )
}

export const query = graphql`
  query($language: String!) {
    strapiPagetree {
      id
      link {
        id
        anchor
        url
      }
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
