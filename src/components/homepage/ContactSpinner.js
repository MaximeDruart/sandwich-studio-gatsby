import React from "react"
import { motion } from "framer-motion"
import styled from "styled-components"
import useStore from "../../../store"

const StyledContactSpinner = styled(motion.button)`
  display: block;
  position: fixed;
  right: max(5vw, 40px);
  z-index: 2;
  bottom: 5vh;
  width: 135px;
  height: 135px;
  .img {
    width: 100%;
    height: 100%;
    cursor: pointer;
  }

  @media (max-width: 600px) {
    transform: scale(0.7);
  }
`

const ContactSpinner = ({ scroll }) => {
  const canvasLoadStatus = useStore(store => store.canvasLoadStatus)
  return (
    <StyledContactSpinner
      className="link-button"
      onClick={() => {
        if (scroll) scroll.scrollTo("#contact")
      }}
      initial={{ opacity: 0 }}
      animate={{
        opacity: canvasLoadStatus.progress < 100 ? 0 : 1,
        transition: { delay: 1.7 },
      }}
    >
      <motion.img
        animate={{
          rotate: 360,
          transition: { ease: "linear", repeat: Infinity, duration: 12 },
        }}
        whileHover={{ scale: 1.15 }}
        className="img"
        src="/images/contact.png"
      />
    </StyledContactSpinner>
  )
}

export default ContactSpinner
