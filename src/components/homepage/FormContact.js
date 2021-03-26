/* eslint-disable jsx-a11y/no-onchange */
import React, { useCallback, useMemo, useState } from "react"
import { useTranslation } from "gatsby-plugin-react-i18next"
import styled from "styled-components"
import { validateContact } from "../../../assets/utils/formValidator"
import { AnimatePresence, motion } from "framer-motion"
import isEmpty from "is-empty"
import { ReactComponent as Loader } from "../../../assets/icons/loader.svg"

const encode = data =>
  Object.keys(data)
    .map(
      key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key].value)
    )
    .join("&")

const StyledFormContact = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-flow: column nowrap;
  .title {
    width: min(400px, 100%);
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
          .error-message {
            margin: 10px 0px;
            color: #ff6565;
            ${({ theme }) => theme.textStyles.text};
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
        &.brochure {
          display: flex;
          flex-flow: row-reverse nowrap;
          align-items: center;
          justify-content: flex-end;
          input {
            width: 30px;
            margin-right: 15px;
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

const buttonVariants = {}

const overlayVariants = {
  loading: {
    x: 0,
    transition: { ease: "easeInOut", duration: 0.6 },
  },
  success: {
    background: "rgb(83 141 90)",
  },
}
const loaderVariants = {
  loading: {
    rotate: 360,
    transition: { ease: "linear", duration: 2.5, repeat: Infinity },
  },
}

const FormContact = () => {
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
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
    brochure: {
      value: "",
      placeholder: "",
      displayName: t("form-contact-display-names", { returnObjects: true })[7],
      type: "checkbox",
    },
  })

  const handleSubmit = e => {
    setErrors({})
    e.preventDefault()
    const { errors, isValid } = validateContact(logs)

    console.log(errors, isValid)

    if (isValid) {
      setLoading(true)
      const form = e.target
      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({
          "form-name": { value: form.getAttribute("name") },
          ...logs,
        }),
      })
        .then(() => {
          setSuccess(true)
          setLoading(false)
        })
        .catch(error => {
          setErrors({ server: error })
          setLoading(false)
        })
    } else {
      setErrors(errors)
    }
  }
  const handleChange = useCallback(
    ({ target }) => {
      let { name, value } = target
      const copy = { ...logs }
      copy[name].value = value
      setLogs(copy)
    },
    [logs, setLogs]
  )

  // const kbHandler = e => {
  //   e.preventDefault()
  // }

  // const toggleKbScroll = bool => {
  //   bool
  //     ? window.addEventListener("keydown", kbHandler)
  //     : window.removeEventListener("keydown", kbHandler)
  // }

  const formFields = useMemo(
    () =>
      Object.entries(logs)
        .slice(0, 5)
        .map(([key, prop]) => (
          <div key={key} className="form-group">
            <div className="label-group">
              <label htmlFor={key}>{prop.displayName}</label>
              {errors[key] && (
                <div className="error-message">{errors[key]}</div>
              )}
            </div>
            <motion.input
              animate={{
                borderColor: errors[key]
                  ? "rgb(255, 101, 101)"
                  : "rgb(255,255,255)",
              }}
              autoCorrect="off"
              placeholder={prop.placeholder}
              type={prop.type}
              // onFocus={e => prop.type === "date" && toggleKbScroll(e)}
              // onBlur={e => prop.type === "date" && toggleKbScroll(e)}
              name={key}
              id={key}
              value={prop.value}
              onChange={handleChange}
            />
          </div>
        )),
    [logs, errors, handleChange]
  )

  return (
    <StyledFormContact>
      <div className="title">
        <div className="form-headline">{t("form-contact-headline")}</div>
        <div className="form-bottom-line">{t("form-contact-bottom-line")}</div>
      </div>
      <form
        name="contact"
        method="post"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        onSubmit={handleSubmit}
      >
        <div className="fields">
          <span>{errors.server}</span>
          <input type="hidden" name="form-name" value="contact" />
          {formFields}
          {/* easier to do the last two fields manually */}
          <div className="form-group">
            <div className="label-group">
              <label htmlFor="service">{logs.service.displayName}</label>
              {errors.service && (
                <div className="error-message">{errors.service}</div>
              )}
            </div>

            <select
              name="service"
              id="service"
              value={logs.service.value}
              onChange={handleChange}
              style={{
                color: logs.service.value === "" ? "#a9a9a9" : "white",
                borderColor: errors.service
                  ? "rgb(255, 101, 101)"
                  : "rgb(255,255,255)",
              }}
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
          <div className="form-group">
            <div className="label-group">
              <label htmlFor="message">{logs.message.displayName}</label>
              {errors.message && (
                <div className="error-message">{errors.message}</div>
              )}
            </div>
            <textarea
              maxLength="900"
              placeholder={logs.message.placeholder}
              type={logs.message.type}
              name="message"
              id="message"
              value={logs.message.value}
              onChange={handleChange}
            />
          </div>
          <div className="form-group brochure">
            <div className="label-group">
              <label htmlFor="brochure">{logs.brochure.displayName}</label>
              {errors.brochure && (
                <div className="error-brochure">{errors.brochure}</div>
              )}
            </div>
            <input
              placeholder={logs.brochure.placeholder}
              type={logs.brochure.type}
              name="brochure"
              id="brochure"
              value={logs.brochure.value}
              onChange={handleChange}
            />
          </div>
        </div>
        <motion.button
          style={{ cursor: success ? "auto" : "pointer" }}
          className="submit-button"
          animate={
            success
              ? "success"
              : loading
              ? "loading"
              : !isEmpty(errors) && "error"
          }
          variants={buttonVariants}
          disabled={success}
        >
          <motion.div
            initial={{ x: "-100%" }}
            variants={overlayVariants}
            className="overlay"
          >
            <AnimatePresence exitBeforeEnter>
              {success ? (
                <motion.span animate={{ opacity: 1 }} initial={{ opacity: 0 }}>
                  {t("form-submit-success-message")}
                </motion.span>
              ) : (
                <motion.div
                  variants={loaderVariants}
                  className="loader-wrapper"
                  exit={{ opacity: 0 }}
                >
                  <Loader className="loader" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          <span>Send form</span>
        </motion.button>
      </form>
    </StyledFormContact>
  )
}

export default FormContact
