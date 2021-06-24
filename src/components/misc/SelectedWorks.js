import styled from "styled-components"
import React, { useRef, useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useTranslation } from "gatsby-plugin-react-i18next"
import { ReactComponent as Arrow } from "../../../assets/icons/upwards-arrow.svg"
import { useMediaQuery } from "react-responsive"
import axios from 'axios';
import AniLink from "gatsby-plugin-transition-link/AniLink"
import PlaceHolder from '../misc/imagePlaceholder';

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
      margin-left: 5vw;
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
          .viewmore-text {
            position: absolute;
            top: 65%;
            left: 50%;
            transform: translate(-50%, -50%);
            display: flex;
            flex-flow: column nowrap;
            align-items: center;
            opacity: 1;

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

    @media (max-width: 1200px) {
      .works {
        margin-left: 0;
      }
    }
    @media (max-width: 600px) {
      justify-content: center;
      .works {
        flex-flow: column;
        margin-left: 0;

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

const SelectedWorks = (props,apiData) => {
  let [filterby,setfilterby] = useState(props.filterby ? props.filterby : props.apiData.filterby)
  const worksRef = useRef(null)
  const { t, ready } = useTranslation()
  const isMobile = useMediaQuery({ query: "(max-width: 600px)" })
  const [isDragging, setIsDragging] = useState(false)
  let [apiResp,setApiResp] = useState([{tag:"undone",cover:[]}])
  let [isLoading,setIsLoading] = useState(true)

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(t("backend-url")+'/pageprojects');
        setApiResp(response.data)
        setIsLoading(false)
      } catch (error) {
      }
    }
    if(apiResp[0].tag ==="undone"){
      fetchServices()
    }
  },[apiResp,t])

  return (
    <StyledSelectedWorks id="projects">

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
            apiResp.filter(item => item.tag.includes(filterby))
              .map((work, index) => (
                <div key={work.title + index} className="work">
                  <motion.div
                    variants={{ hover: { scale: 0.985 } }}
                    whileHover="hover"
                    className="image-container"
                  >
                    <AniLink
                      cover
                      direction="down"
                      bg="#0D0D0D"
                      to={"/projects/"+work.slug}>
                      <PlaceHolder
                        variants={hoverVariants}
                        draggable="true"
                        src={t("images-url")+work.cover.url}
                        width="300px"
                        height="450px"
                        alt=""
                      />
                      <motion.div
                        variants={hoverTextVariants}
                        className="hover-text"
                      >
                        <span>{t("selected-works-hover-text")}</span>
                        <Arrow />
                      </motion.div>
                    </AniLink>
                  </motion.div>
                  <motion.div className="title">{work.title}</motion.div>
                  <motion.div className="desc">{work.description}</motion.div>
                  <motion.div className="fulldesc">{work.fulldesc}</motion.div>
                </div>
              ))}

              {isLoading ? (
                <div className="work" style={{backgroundColor:"#1b1b1b",height:"630px"}}>
                <motion.div
                  className="image-container"
                >
                </motion.div>
              </div>
              ) : null}
              {filterby!=="all" ? (
                <div className="work">
                  <motion.div
                    variants={{ hover: { scale: 0.985 } }}
                    whileHover="hover"
                    className="image-container"
                    onClick={() =>
                      !isDragging &&
                      setfilterby("all")
                    }
                  >
                    <motion.div
                      variants={hoverTextVariants}
                      className="viewmore-text"
                    >
                      <span>Tous les projets</span>
                      <Arrow />
                    </motion.div>
                  </motion.div>
                </div>
              ) : null}
        </motion.div>
      </motion.div>
    </StyledSelectedWorks>
  )
}

export default SelectedWorks
