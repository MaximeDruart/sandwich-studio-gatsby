import { css } from "styled-components"

const theme = {}

theme.colors = {
  background: "#0D0D0D",
  grey: "#828F91",
  text: "#FFFFFF",
}

theme.textStyles = {
  headline: css`
    font-family: NeueMontrealRegular;
    font-size: max(10vw, 70px);
    letter-spacing: 0.01em;
    opacity:0.1;
  `,
  h1: css`
    font-family: NeueMontrealBold;
    font-size: 100px;
    line-height: 140.62%;
    /* or 101px */
    letter-spacing: 0.01em;
    @media (max-width: 600px) {
      font-size: 35px;
    }
  `,
  h2: css`
    font-family: NeueMontrealBold;
    font-style: normal;
    font-weight: normal;
    font-size: 74px;
    line-height: 110%;
    /* identical to box height, or 79px */
    letter-spacing: 0.0125em;
    @media (max-width: 600px) {
      font-size: 56px;
    }
  `,
  h3: css`
    margin-bottom:10px;
    font-family: NeueMontrealRegular;
    font-style: normal;
    font-weight: normal;
    font-size: 48px;
    line-height: 116%;
    /* identical to box height, or 67px */
    letter-spacing: 0.01em;
    @media (max-width: 600px) {
      font-size: 36px;
    }
  `,
  h4: css`
    font-family: NeueMontrealRegular;
    font-style: normal;
    font-weight: normal;
    font-size: 38px;
    line-height: 140.62%;
    /* or 53px */
    letter-spacing: 0.01em;
    @media (max-width: 600px) {
      font-size: 28px;
    }
  `,
  h5: css`
    font-family: NeueMontrealRegular;
    font-style: normal;
    font-weight: normal;
    font-size: 30px;
    line-height: 140.62%;
    /* or 42px */
    letter-spacing: 0.01em;
  `,
  h6: css`
    font-family: NeueMontrealRegular;
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 140.62%;
    /* or 28px */
    letter-spacing: 0.01em;
  `,
  text: css`
    font-family: NeueMontrealRegular;
    font-style: normal;
    font-weight: normal;
    font-size: 19px;
    line-height: 140.62%;
    /* identical to box height, or 22px */
    letter-spacing: 0.03em;
    @media (max-width: 600px) {
      font-size: 16px;
    }
  `,
  smallText: css`
    font-family: NeueMontrealRegular;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 140.62%;
    /* identical to box height, or 20px */
    letter-spacing: 0.01em;
    @media (max-width: 600px) {
      font-size: 14px;
    }
  `,
  button: css`
    background: white;
    font-family: NeueMontrealRegular;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 16px;
    letter-spacing: 0.08px;
    padding: 15px 30px;
    border-radius: 20px;
    outline: none;
    border: none;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    margin-top: 20px;
    transition:0.2s all;
    &:hover{
      background: #eaeaea;
      transition:0.2s all;
    }

    @media (max-width: 600px) {
      font-size: 14px;
    }

    .text-content {
      color: black;
    }

    .arrow {
      margin-left: 18px;
    }
    &:focus {
      border: none;
      outline: none;
    }

    &.submit-button {
      position: relative;
      overflow: hidden;
      span {
        color: black;
      }
      .overlay {
        width: 100%;
        height: 100%;
        background: rgb(55 55 55);
        position: absolute;
        left: 0;
        top: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        .loader {
          width: 30px;
          height: 30px;
        }
      }
    }
  `,
}

export default theme
