import React, { useEffect, useRef, useState } from "react"
import { Helmet } from "react-helmet"
import { graphql } from "gatsby"
import axios from 'axios';
import { useTranslation } from "gatsby-plugin-react-i18next"

import Header from "../components/Header"
import Hero from "../components/homepage/Hero"
import About from "../components/homepage/About"
import Footer from "../components/Footer"
import ContactSpinner from "../components/homepage/ContactSpinner"
import Cards from "../components/homepage/Cards"
import SelectedWorks from "../components/misc/SelectedWorks"
import Headline from "../components/misc/Headline"
import useStore from "../../store"
import { useMediaQuery } from "react-responsive"
import LeadMagnet from "../components/misc/LeadMagnet"
import Seo from "../components/misc/Seo"

import "../global.css"

export default function Home({ location }) {
  const { t } = useTranslation()
  const mainContainerRef = useRef(null)
  const [scroll, setScroll] = useState(null)
  let [apiData,setApiData] = useState(null)
  const canvasLoadStatus = useStore(state => state.canvasLoadStatus)
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" })

  useEffect(() => {
    const fetchHome = async () => {
      try {
        const response = await axios.get(t("backend-url")+'/homepage');
        setApiData(response.data)
      } catch (error) {
        setApiData(null)
      }
    }
    fetchHome()
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
    <Seo
      title="Sandwich Studio - Agence créative à Paris"
      description="Sandwich Studio est votre spécialiste de la transformation digitiale et de vos communications multi-supports. Design, web et marketing."
      article={false}
    ></Seo>

      <Header location={location} isHomepage={true} scroll={scroll} />

      <main data-scroll-container ref={mainContainerRef}>
        <ContactSpinner scroll={scroll} />
        {/* <CanCanvas scroll={scroll} /> */}
        <Hero />
        <About
          titleWho={apiData != null ? apiData.info.titleWhowheare : "______"}
          bodyWho={apiData != null ? apiData.info.bodyWhoweare : "______"}
          imgWhoFront={apiData != null ? apiData.info.imgWhoweare[0].url : "______"}
          imgWhoBack={apiData != null ? apiData.info.imgWhoweare[1].url : "______"}
          titleMission={apiData != null ? apiData.info.titleMission : "______"}
          bodyMission={apiData != null ? apiData.info.bodyMission : "______"}
          imgMission={apiData != null ? apiData.info.imgMission[0].url : "______"}
          imgMissionOne={apiData != null ? apiData.info.imgMission[1].url : "______"}
          imgMissionTwo={apiData != null ? apiData.info.imgMission[2].url : "______"}   />
        <Cards services={apiData != null ? apiData.info.homeServices : []}></Cards>
        <Headline title="Nos projets"></Headline>
        <SelectedWorks filterby="all" />
        <LeadMagnet
          title={apiData != null ? apiData.info.formTitle : "______"}
          body={apiData != null ? apiData.info.formBody : "______"}
          />
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
