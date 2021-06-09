import styled from "styled-components"
import React, { useRef, useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useTranslation } from "gatsby-plugin-react-i18next"
import { ReactComponent as Arrow } from "../../../assets/icons/upwards-arrow.svg"
import { useMediaQuery } from "react-responsive"
import useStore from "../../../store"
import axios from 'axios';

const StyledSelectedWorks = styled.div`
  width: 100vw;
  /* overflow: hidden; */

  padding: 5vh max(5vw, 40px) 0 max(5vw, 40px);

  * {
    font-family: NeueMontrealRegular;
    color: ${({ theme }) => theme.colors.text};
  }

  .headline {
    ${({ theme }) => theme.textStyles.headline};
    white-space: nowrap;
    width: 100%;
    margin-bottom: 8vh;
  }

  .works-wrapper {
    display: flex;
    /* justify-content: center; */
    align-items: center;
    .works {
      width: fit-content;
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      align-items: baseline;

      .work {
        width:300px;
        margin-right: 62px;
        .image-container {
          cursor: pointer;
          width: 300px;
          height: 450px;
          overflow: hidden;
          position: relative;
          img {
            position: absolute;
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          .hover-text {
            position: absolute;
            top: 65%;
            left: 50%;
            transform: translate(-50%, -50%);
            display: flex;
            flex-flow: column nowrap;
            align-items: center;
            opacity: 0;

            span {
              ${({ theme }) => theme.textStyles.h3};
              margin-bottom: 30px;
            }
          }
        }
        .title {
          ${({ theme }) => theme.textStyles.h4};
          font-family:NeueMontrealBold;
          cursor: pointer;
        }
        .desc {
          ${({ theme }) => theme.textStyles.text};
        }
        .fulldesc {
          ${({ theme }) => theme.textStyles.text};
          color:#afafaf;
        }
      }
    }

    @media (max-width: 600px) {
      justify-content: center;
      .works {
        flex-flow: column;

        .work {
          margin-right: 0;
          margin-bottom: 60px;
        }
      }
    }
  }
`

const hoverVariants = {
  hover: { scale: 1.08, opacity: 0.5 },
}
const hoverTextVariants = {
  hover: { opacity: 1 },
}

const SelectedWorks = ({ filterby }) => {
  const worksRef = useRef(null)
  const { t, ready } = useTranslation()
  const isMobile = useMediaQuery({ query: "(max-width: 600px)" })
  const [isDragging, setIsDragging] = useState(false)
  let [apiData,setApiData] = useState([{tag:"undone",cover:[]}])

  const setSelectedWork = useStore(state => state.setSelectedWork)

  useEffect(() => {

    const fetchServices = async () => {
      try {
        const response = await axios.get(t("backend-url")+'/projects');
        setApiData(response.data)
      } catch (error) {
      }
    }
    if(apiData[0].tag ==="undone"){
      fetchServices()
    }
    console.log(apiData)
  })

  return (
    <StyledSelectedWorks id="projects" data-scroll-section>
      <div
        data-scroll
        data-scroll-direction="horizontal"
        data-scroll-speed="7"
        className="headline"
      >
        {t("selected-works-headline")} • {t("selected-works-headline")} •{" "}
        {t("selected-works-headline")}
      </div>

      <motion.div className="works-wrapper">
        <motion.div
          ref={worksRef}
          dragConstraints={{
            left: worksRef.current
              ? -(
                  worksRef.current.getBoundingClientRect().width -
                  window.innerWidth +
                  Math.max(50, 0.05 * window.innerWidth)
                )
              : // this value doesn't matter
                -1000,
            right: 0,
          }}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setTimeout(() => setIsDragging(false), 300)}
          drag={isMobile ? "" : "x"}
          className="works"
        >
          {ready &&
            apiData.filter(item => item.tag.includes(filterby))
              .map((work, index) => (
                <div key={work.title + index} className="work">
                  <motion.div
                    variants={{ hover: { scale: 0.985 } }}
                    whileHover="hover"
                    className="image-container"
                    onClick={() =>
                      !isDragging &&
                      setSelectedWork({ isOpen: true, workNumber: work.id , workImages:work.media})
                    }
                  >
                    <motion.img
                      variants={hoverVariants}
                      draggable="false"
                      src={t("images-url")+work.cover[0].url}
                      alt=""
                    />
                    <motion.div
                      variants={hoverTextVariants}
                      className="hover-text"
                    >
                      <span>{t("selected-works-hover-text")}</span>
                      <Arrow />
                    </motion.div>
                  </motion.div>
                  <motion.div className="title">{work.title}</motion.div>
                  <motion.div className="desc">{work.description}</motion.div>
                  <motion.div className="fulldesc">{work.fulldesc}</motion.div>
                </div>
              ))}
        </motion.div>
      </motion.div>
    </StyledSelectedWorks>
  )
}

export default SelectedWorks
