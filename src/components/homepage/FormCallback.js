import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import styled from "styled-components"

const StyledFormCallback = styled.div`
  width: min(500px, 100%);

  padding: 50px;
  border-radius: 8px;
  background: #151515;

  display: flex;
  flex-flow: column nowrap;
  align-items: center;

  .title {
    width: 100%;
    text-align: left;
    .form-headline {
      ${({ theme }) => theme.textStyles.h4};
    }
    .form-bottom-line {
      ${({ theme }) => theme.textStyles.h6};
    }
  }

  form {
    margin-top: 50px;
    width: 100%;

    /* border: 1px solid grey; */
    .fields {
      .form-group {
        margin-bottom: 20px;
        .label-group {
          margin-bottom: 5px;
          label {
            ${({ theme }) => theme.textStyles.h6};
          }
        }
        input,
        textarea,
        select {
          ${({ theme }) => theme.textStyles.text};
          padding: 10px;
          width: 100%;
          background: #151515;
          color: white;
          height: 40px;
          border: thin solid white;
          border-radius: 3px;
        }
        input[type="date"]::-webkit-calendar-picker-indicator {
          filter: invert(1);
        }
        textarea {
          resize: none;
          height: 140px;
        }
        select {
          height: 50px;
          option:first-child {
            color: #a9a9a9;
          }
        }
      }
    }
    button {
      ${({ theme }) => theme.textStyles.button};
      width: 100%;
      color: black;
      justify-content: center;
    }
  }
`

const FormCallback = () => {
  const { t } = useTranslation()
  const [logs, setLogs] = useState({
    name: {
      value: "",
      placeholder: "Norman Reedus",
      displayName: t("form-callback-display-names", { returnObjects: true })[0],
      type: "text",
    },
    phone: {
      value: "",
      placeholder: "",
      displayName: t("form-callback-display-names", { returnObjects: true })[1],
      type: "tel",
    },
  })

  const handleSubmit = event => {
    event.preventDefault()
  }

  const handleChange = ({ target }) => {
    let { name, value } = target
    const copy = { ...logs }
    copy[name].value = value
    setLogs(copy)
  }
  return (
    <StyledFormCallback>
      <div className="title">
        <div className="form-headline">{t("form-callback-headline")}</div>
        <div className="form-bottom-line">{t("form-callback-bottom-line")}</div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="fields">
          {Object.entries(logs)
            .slice(0, 5)
            .map(([key, props]) => (
              <div key={key} className="form-group">
                <div className="label-group">
                  <label htmlFor={key}>{props.displayName}</label>
                  {props.error && (
                    <div className="error-message">{props.error}</div>
                  )}
                </div>
                <input
                  autoCorrect="off"
                  placeholder={props.placeholder}
                  type={props.type}
                  name={key}
                  id={key}
                  value={props.value}
                  onChange={handleChange}
                />
              </div>
            ))}
        </div>
        <button size="large">Send form</button>
      </form>
    </StyledFormCallback>
  )
}

export default FormCallback
