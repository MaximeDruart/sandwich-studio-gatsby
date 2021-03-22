import validator from "validator"
import isEmpty from "is-empty"

const validateContact = fields => {
  const data = { ...fields }
  for (const key in data) {
    data[key] = data[key].value
  }
  let errors = {}
  // Convert empty fields to an empty string so we can use validator functions
  data.name = !isEmpty(data.name) ? data.name : ""
  data.companyName = !isEmpty(data.companyName) ? data.companyName : ""
  data.email = !isEmpty(data.email) ? data.email : ""
  data.phone = !isEmpty(data.phone) ? data.phone : ""
  data.deadline = !isEmpty(data.deadline) ? data.deadline : ""
  data.service = !isEmpty(data.service) ? data.service : ""
  data.message = !isEmpty(data.message) ? data.message : ""
  // Name checks
  if (validator.isEmpty(data.name)) {
    errors.name = "Nom requis"
  }

  // Email checks
  if (validator.isEmpty(data.email)) {
    errors.email = "Mail requis"
  } else if (!validator.isEmail(data.email)) {
    errors.email = "Mail invalide"
  }
  // phone checks
  if (validator.isEmpty(data.phone)) {
    errors.phone = "Téléphone requis"
  } else if (!validator.isMobilePhone(data.phone)) {
    errors.phone = "Numéro de téléphone invalide"
  }

  if (validator.isEmpty(data.deadline)) {
    errors.deadline = "Deadline requise"
  } else if (!validator.isAfter(data.deadline)) {
    errors.deadline = "Date invalide"
  }

  if (validator.isEmpty(data.service)) {
    errors.service = "Service requis"
  }

  return {
    errors,
    isValid: isEmpty(errors),
  }
}
const validateCallback = fields => {
  const data = { ...fields }
  for (const key in data) {
    data[key] = data[key].value
  }
  let errors = {}
  // Convert empty fields to an empty string so we can use validator functions
  data.name = !isEmpty(data.name) ? data.name : ""
  data.phone = !isEmpty(data.phone) ? data.phone : ""

  if (validator.isEmpty(data.name)) {
    errors.name = "Nom requis"
  }

  if (validator.isEmpty(data.phone)) {
    errors.phone = "Téléphone requis"
  } else if (!validator.isMobilePhone(data.phone)) {
    errors.phone = "Numéro de téléphone invalide"
  }

  return {
    errors,
    isValid: isEmpty(errors),
  }
}

export { validateContact, validateCallback }
