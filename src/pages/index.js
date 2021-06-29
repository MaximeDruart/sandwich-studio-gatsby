import React, { useEffect, useState } from "react"
import { graphql } from "gatsby"
import axios from 'axios';
import { useTranslation } from "gatsby-plugin-react-i18next"
import Header from "../components/Header"
import Hero from "../components/homepage/Hero"
import About from "../components/homepage/About"
import Footer from "../components/Footer"
import Cards from "../components/homepage/Cards"
import SelectedWorks from "../components/misc/SelectedWorks"
import Headline from "../components/misc/Headline"
import LeadMagnet from "../components/misc/LeadMagnet"
import Seo from "../components/misc/Seo"
import Luge from '../components/misc/Luge'
export default function Home({ location }) {
  const { t } = useTranslation()
  let [apiData,setApiData] = useState(null)
  let [isLoading,setIsLoading] = useState(true)
  useEffect(() => {
    const fetchHome = async () => {
      try {
        const response = await axios.get(t("backend-url")+'/homepage');
        setApiData(response.data)
        setIsLoading(false)
      } catch (error) {
        setApiData(null)
      }
    }
    if(apiData===null){
      fetchHome()
    }
  })

  return (
    <>
    <Seo
      title="Sandwich Studio - Agence créative à Paris"
      description="Sandwich Studio est votre agence créative spécialiste de la transformation digitale et de vos communications multi-supports. Design, web et marketing."
      article={false}
    ></Seo>
    <Header location={location} isHomepage={true}/>
    <Luge location={location}>
        <main>
          <Hero />
          <About
            isLoading={isLoading}
            titleWho={apiData != null ? apiData.info.titleWhowheare : "______"}
            bodyWho={apiData != null ? apiData.info.bodyWhoweare : "______"}
            imgWhoFront={apiData != null ? apiData.info.imgWhoweare[0].url : "______"}
            imgWhoBack={apiData != null ? apiData.info.imgWhoweare[1].url : "______"}
            titleMission={apiData != null ? apiData.info.titleMission : "______"}
            bodyMission={apiData != null ? apiData.info.bodyMission : "______"}
            imgMission={apiData != null ? apiData.info.imgMission[0].url : "______"}
            imgMissionOne={apiData != null ? apiData.info.imgMission[1].url : "______"}
            imgMissionTwo={apiData != null ? apiData.info.imgMission[2].url : "______"}   />
            <Headline title="Nos services"></Headline>
          <Cards isLoading={isLoading} services={apiData != null ? apiData.info.homeServices : []}></Cards>
          <Headline title="Nos projets"></Headline>
          <SelectedWorks filterby="all" />
          <Headline title="Pour vous"></Headline>
          <LeadMagnet
            title={apiData != null ? apiData.info.formTitle : "______"}
            body={apiData != null ? apiData.info.formBody : "______"}
            />
          <Footer />
        </main>
      </Luge>
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
