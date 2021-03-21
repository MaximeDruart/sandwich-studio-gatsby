/* eslint-disable jsx-a11y/no-onchange */
import React, { useState } from "react"
import { graphql } from "gatsby"
import { useTranslation } from "gatsby-plugin-react-i18next"
import styled from "styled-components"

const StyledFormContact = styled.div`
  width: 100%;
  .title {
    .form-headline {
      ${({ theme }) => theme.textStyles.h4};
    }
    .form-bottom-line {
      ${({ theme }) => theme.textStyles.h6};
    }
  }

  form {
    margin-top: 50px;
    width: min(400px, 100%);
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
          background: ${({ theme }) => theme.colors.background};
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
  @media (max-width: 1200px) {
    margin-bottom: 10vh;
  }
`

const FormContact = () => {
  const { t } = useTranslation()
  const [logs, setLogs] = useState({
    name: {
      value: "",
      placeholder: "Solid Snake",
      displayName: t("form-contact-display-names", { returnObjects: true })[0],
      type: "text",
    },
    companyName: {
      value: "",
      placeholder: "Diamond Dogs",
      displayName: t("form-contact-display-names", { returnObjects: true })[1],
      type: "text",
    },
    email: {
      value: "",
      placeholder: "a.b@gmail.com",
      displayName: t("form-contact-display-names", { returnObjects: true })[2],
      type: "email",
    },
    phone: {
      value: "",
      placeholder: "",
      displayName: t("form-contact-display-names", { returnObjects: true })[3],
      type: "tel",
    },
    deadline: {
      value: "",
      placeholder: "",
      displayName: t("form-contact-display-names", { returnObjects: true })[4],
      type: "date",
    },
    service: {
      value: "",
      placeholder: "Select a service",
      displayName: t("form-contact-display-names", { returnObjects: true })[5],
      type: "dropdown",
    },
    message: {
      value: "",
      placeholder: "",
      displayName: t("form-contact-display-names", { returnObjects: true })[6],
      type: "text",
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
    <StyledFormContact>
      <div className="title">
        <div className="form-headline">{t("form-contact-headline")}</div>
        <div className="form-bottom-line">{t("form-contact-bottom-line")}</div>
      </div>
      <form netlify onSubmit={handleSubmit}>
        <div className="fields">
          {/* easier to do the last two fields manually */}
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
          <div key="service" className="form-group">
            <div className="label-group">
              <label htmlFor="service">{logs.service.displayName}</label>
              {logs.service.error && (
                <div className="error-message">{logs.service.error}</div>
              )}
            </div>

            <select
              name="service"
              id="service"
              value={logs.service.value}
              onChange={handleChange}
              style={{ color: logs.service.value === "" ? "#a9a9a9" : "white" }}
            >
              <option value="" disabled>
                Select your option
              </option>
              <option value="choice-1">choice-1</option>
              <option value="choice-2">choice-2</option>
              <option value="choice-3">choice-3</option>
              <option value="choice-4">choice-4</option>
              <option value="choice-5">choice-5</option>
            </select>
          </div>
          <div key="message" className="form-group">
            <div className="label-group">
              <label htmlFor="message">{logs.message.displayName}</label>
              {logs.message.error && (
                <div className="error-message">{logs.message.error}</div>
              )}
            </div>
            <textarea
              maxLength="300"
              placeholder={logs.message.placeholder}
              type={logs.message.type}
              name="message"
              id="message"
              value={logs.message.value}
              onChange={handleChange}
            />
          </div>
        </div>
        <button size="large">Send form</button>
      </form>
    </StyledFormContact>
  )
}

export default FormContact
