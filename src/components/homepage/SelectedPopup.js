import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { motion } from "framer-motion"
import useStore from "../../../store"
import { ReactComponent as Close } from "../../../assets/icons/close.svg"
import { ReactComponent as SmallArrow } from "../../../assets/icons/small-arrow.svg"
import gsap from "gsap/gsap-core"

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
    right: max(5vw, 20px);
    top: 5vh;
  }

  .filter {
    pointer-events: none;
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
      left: 5vw;
      top: 50%;
      transform: translateY(-50%);
      &.move-right {
        left: unset;
        right: 5vw;
      }
      &.move-left {
        transform: rotate(180deg);
      }

      svg {
        width: 40px;
        height: 40px;
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

const imageSources = [
  "/images/sw-1.jpg",
  "/images/sw-1.jpg",
  "/images/sw-1.jpg",
  "/images/sw-1.jpg",
]

const clamper = gsap.utils.clamp(0, imageSources.length - 1)

// taken from https://codesandbox.io/s/framer-motion-image-gallery-pqvx3?file=/src/Example.tsx
const swipeConfidenceThreshold = 12000
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity
}

const SelectedPopup = () => {
  const setSelectedWork = useStore(state => state.setSelectedWork)
  const selectedWork = useStore(state => state.selectedWork)

  const [focusedImage, setFocusedImage] = useState(0)

  const escapeHandler = ({ key }) =>
    key === "Escape" && setSelectedWork({ isOpen: false })

  useEffect(() => {
    window.addEventListener("keydown", escapeHandler)
    return () => window.removeEventListener("keydown", escapeHandler)
  }, [])

  const switchImage = dir =>
    setFocusedImage(focusedImage => clamper(focusedImage + dir))

  return (
    <StyledPopup
      initial={{
        opacity: 0,
        pointerEvents: "none",
      }}
      variants={containerVariants}
      animate={selectedWork.isOpen ? "open" : "closed"}
    >
      <motion.div className="filter"></motion.div>
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
