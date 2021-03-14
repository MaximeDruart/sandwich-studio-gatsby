import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import styled from "styled-components"

const StyledFormContact = styled.div`
  width: 300px;
`

const FormContact = () => {
  const { t } = useTranslation()
  const [logs, setLogs] = useState({
    name: {
      value: "",
      placeholder: "",
      displayName: t("form-contact-display-names", { returnObjects: true })[0],
      type: "text",
    },
    companyName: {
      value: "",
      placeholder: "",
      displayName: t("form-contact-display-names", { returnObjects: true })[1],
      type: "text",
    },
    email: {
      value: "",
      placeholder: "",
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
      type: "datetime-local",
    },
    service: {
      value: "",
      placeholder: "",
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
    console.log(copy)
  }

  return (
    <StyledFormContact>
      <div className="title">
        <div className="form-headline">{t("form-contact-headline")}</div>
        <div className="form-bottom-line">{t("form-contact-bottom-line")}</div>
      </div>
      <form onSubmit={handleSubmit}>
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
    </StyledFormContact>
  )
}

export default FormContact
