export const downloadFile = url => {
  // Create a link and set the URL using `createObjectURL`
  const link = document.createElement("a")
  link.style.display = "none"
  link.href = url
  link.download = "Sandwich Studio - Checklist"

  // It needs to be added to the DOM so it can be clicked
  document.body.appendChild(link)
  link.click()

  // To make this work on Firefox we need to wait
  // a little while before removing it.
  setTimeout(() => {
    link.parentNode.removeChild(link)
  }, 0)
}
