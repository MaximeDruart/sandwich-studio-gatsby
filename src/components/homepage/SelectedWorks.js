import styled from "styled-components"
import React, { useRef } from "react"
import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"
import { ReactComponent as Arrow } from "../../../assets/icons/upwards-arrow.svg"

const StyledSelectedWorks = styled.div`
  border: 1px solid yellow;
  width: 100vw;
  margin-top: 30vh;
  /* overflow: hidden; */

  padding: 5vh max(5vw, 50px) 0 max(5vw, 50px);

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
    .works {
      width: fit-content;
      display: flex;
      flex-flow: row nowrap;

      .work {
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
          ${({ theme }) => theme.textStyles.h6};
          cursor: pointer;
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

const SelectedWorks = () => {
  const worksRef = useRef(null)
  const { t, ready } = useTranslation()
  return (
    <StyledSelectedWorks data-scroll-section>
      <div
        data-scroll
        data-scroll-direction="horizontal"
        data-scroll-speed="9"
        className="headline"
      >
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
                -500,
            right: 0,
          }}
          drag="x"
          layout
          className="works"
        >
          {ready &&
            t("selected-works-categories", { returnObjects: true }).map(
              (category, index) => (
                <div key={category + index} className="work">
                  <motion.div
                    variants={{ hover: { scale: 0.985 } }}
                    whileHover="hover"
                    className="image-container"
                  >
                    <motion.img
                      variants={hoverVariants}
                      draggable="false"
                      src={`/images/sw-${index + 1}.jpg`}
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
                  <motion.div className="title">{category}</motion.div>
                </div>
              )
            )}
        </motion.div>
      </motion.div>
    </StyledSelectedWorks>
  )
}

export default SelectedWorks
