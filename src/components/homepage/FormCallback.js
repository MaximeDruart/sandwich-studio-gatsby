import React, { useMemo, useState } from "react"
import { useTranslation } from "gatsby-plugin-react-i18next"
import styled from "styled-components"
import { validateCallback } from "../../../assets/utils/formValidator"
import { AnimatePresence, motion } from "framer-motion"
import isEmpty from "is-empty"
import { ReactComponent as Loader } from "../../../assets/icons/loader.svg"

const encode = data =>
  Object.keys(data)
    .map(
      key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key].value)
    )
    .join("&")

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

const FormCallback = () => {
  const { t } = useTranslation()
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
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

  const handleSubmit = e => {
    setErrors({})
    e.preventDefault()
    const { errors, isValid } = validateCallback(logs)

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

  const handleChange = ({ target }) => {
    let { name, value } = target
    const copy = { ...logs }
    copy[name].value = value
    setLogs(copy)
  }

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
              name={key}
              id={key}
              value={prop.value}
              onChange={handleChange}
            />
          </div>
        )),
    [logs, errors]
  )

  return (
    <StyledFormCallback>
      <div className="title">
        <div className="form-headline">{t("form-callback-headline")}</div>
        <div className="form-bottom-line">{t("form-callback-bottom-line")}</div>
      </div>
      <form
        name="callback"
        method="post"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        onSubmit={handleSubmit}
      >
        <div className="fields">
          <span>{errors.server}</span>
          <input type="hidden" name="form-name" value="callback" />
          {formFields}
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
    </StyledFormCallback>
  )
}

export default FormCallback
