import { css } from "styled-components"

const theme = {}

theme.colors = {
  background: "#0D0D0D",
  text: "#FFFFFF",
}

theme.textStyles = {
  headline: css`
    font-family: NeueMontrealRegular;
    font-size: 12vw;
    letter-spacing: 0.01em;
  `,
  h1: css`
    font-family: NeueMontrealRegular;
    font-size: 100px;
    line-height: 140.62%;
    /* or 101px */
    letter-spacing: 0.01em;
  `,
  h2: css`
    font-family: NeueMontrealRegular;
    font-style: normal;
    font-weight: normal;
    font-size: 74px;
    line-height: 110%;
    /* identical to box height, or 79px */
    letter-spacing: 0.0125em;
  `,
  h3: css`
    font-family: NeueMontrealRegular;
    font-style: normal;
    font-weight: normal;
    font-size: 48px;
    line-height: 116%;
    /* identical to box height, or 67px */
    letter-spacing: 0.01em;
  `,
  h4: css`
    font-family: NeueMontrealRegular;
    font-style: normal;
    font-weight: normal;
    font-size: 38px;
    line-height: 140.62%;
    /* or 53px */
    letter-spacing: 0.01em;
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
  `,
  smallText: css`
    font-family: NeueMontrealRegular;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 140.62%;
    /* identical to box height, or 20px */
    letter-spacing: 0.01em;
  `,
  button: css`
    background: #ebdcd4;
    font-family: NeueMontrealRegular;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 16px;
    letter-spacing: 0.08px;
    padding: 15px 30px;
    border-radius: 4px;
    outline: none;
    border: none;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;

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
  `,
}

export default theme
