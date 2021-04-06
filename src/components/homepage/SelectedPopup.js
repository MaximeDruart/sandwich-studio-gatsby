import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { motion } from "framer-motion"
import useStore from "../../../store"
import { ReactComponent as Close } from "../../../assets/icons/close.svg"
import { ReactComponent as SmallArrow } from "../../../assets/icons/small-arrow.svg"
import gsap from "gsap/gsap-core"
import { useMemo } from "react"

const StyledPopup = styled(motion.div)`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100000;
  padding: 10vh max(10vw, 20px) 10vh max(10vw, 20px);

  .close {
    cursor: pointer;
    position: absolute;
    right: max(5vw, 40px);
    top: 5vh;
  }

  .filter {
    position: absolute;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    background: black;
    opacity: 0.92;
    z-index: -1;
  }

  .move {
    .move-dir {
      z-index: 10;
      cursor: pointer;
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      height: 80vh;
      width: 15vw;
      display: flex;
      align-items: center;
      justify-content: center;
      &.move-right {
        left: unset;
        right: 0;
      }
      &.move-left {
        svg {
          transform: rotate(180deg);
          transform-origin: center;
        }
      }
    }
  }
  .gallery {
    width: 100%;
    height: 100%;

    .images {
      height: 100%;
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      justify-content: flex-start;
      width: fit-content;
      .image {
        display: flex;
        align-items: center;
        user-select: none;
        margin: 0 5vw 0 5vw;
        height: 80vh;
        width: 70vw;
        cursor: grab;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
    @media (max-width: 600px) {
      .images {
        .image {
          img {
            height: unset;
          }
        }
      }
    }
  }
`

const containerVariants = {
  open: {
    pointerEvents: "auto",
    opacity: 1,
  },
  closed: {
    pointerEvents: "none",
    opacity: 0,
  },
}

const imgVariants = {
  focused: {},
  unfocused: {
    scale: 0.6,
    filter: "brightness(50%)",
  },
}

const noOfImagesByWork = [2, 4, 0, 1, 4]

// taken from https://codesandbox.io/s/framer-motion-image-gallery-pqvx3?file=/src/Example.tsx
const swipeConfidenceThreshold = 12000
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity
}

const SelectedPopup = () => {
  const setSelectedWork = useStore(state => state.setSelectedWork)
  const selectedWork = useStore(state => state.selectedWork)

  const [focusedImage, setFocusedImage] = useState(0)

  const imageSources = useMemo(
    () =>
      new Array(noOfImagesByWork[selectedWork.workNumber])
        .fill()
        .map(
          (_, index) =>
            `/images/sw-${selectedWork.workNumber + 1}_${index + 1}.jpg`
        ),
    [selectedWork]
  )

  const clamper = useMemo(() => gsap.utils.clamp(0, imageSources.length - 1), [
    imageSources,
  ])

  useEffect(() => {
    const escapeHandler = ({ key }) =>
      key === "Escape" && setSelectedWork({ isOpen: false })

    window.addEventListener("keydown", escapeHandler)

    return () => window.removeEventListener("keydown", escapeHandler)
  }, [setSelectedWork])

  const switchImage = dir =>
    setFocusedImage(focusedImage => clamper(focusedImage + dir))

  useEffect(() => selectedWork.isOpen && setFocusedImage(0), [selectedWork])

  return (
    <StyledPopup
      initial={{
        opacity: 0,
        pointerEvents: "none",
      }}
      variants={containerVariants}
      animate={selectedWork.isOpen ? "open" : "closed"}
    >
      <motion.div
        onClick={() => setSelectedWork({ isOpen: false })}
        className="filter"
      ></motion.div>
      <motion.div
        onClick={() => setSelectedWork({ isOpen: false })}
        className="close"
      >
        <Close />
      </motion.div>
      <div className="move">
        <motion.div
          animate={{
            cursor: focusedImage === 0 ? "auto" : "pointer",
            filter: focusedImage === 0 ? "brightness(50%)" : "brightness(100%)",
          }}
          onClick={() => switchImage(-1)}
          className="move-dir move-left"
        >
          <SmallArrow />
        </motion.div>
        <motion.div
          animate={{
            cursor:
              focusedImage === imageSources.length - 1 ? "auto" : "pointer",
            filter:
              focusedImage === imageSources.length - 1
                ? "brightness(50%)"
                : "brightness(100%)",
          }}
          onClick={() => switchImage(1)}
          className="move-dir move-right"
        >
          <SmallArrow />
        </motion.div>
      </div>
      <div className="gallery">
        <motion.div
          animate={{ x: -80 * focusedImage + "vw" }}
          transition={{ ease: "easeInOut" }}
          className="images"
        >
          {imageSources.map((src, index) => (
            <motion.div
              key={src + index}
              variants={imgVariants}
              animate={index === focusedImage ? "focused" : "unfocused"}
              className="image"
            >
              <motion.img
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x)

                  if (swipe < -swipeConfidenceThreshold) {
                    switchImage(1)
                  } else if (swipe > swipeConfidenceThreshold) {
                    switchImage(-1)
                  }
                }}
                drag="x"
                src={src}
                alt=""
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </StyledPopup>
  )
}

export default SelectedPopup
