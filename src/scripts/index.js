window.addEventListener(`load`, () => {
    checkboxOnChangeHandler()
})

function checkboxOnChangeHandler() {
    const checkbox = document.getElementById(`free-checkbox`)
    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            checkbox.value = 0.0
        } else {
            checkbox.value = ""
        }
    })
}

const getActivity = (event) => {
    event.preventDefault()
    const baseURL = `https://www.boredapi.com/api/activity?`

    const submitBtn = document.getElementById(`submit-form-btn`)
    const randomBtn = document.getElementById(`random-activity-btn`)
    const fieldset = document.getElementById(`activity-generator`)

    const loadingSpan = document.createElement('span')
    loadingSpan.setAttribute("class", "spinner-border spinner-border-sm")
    loadingSpan.setAttribute("role", "status")
    loadingSpan.setAttribute("aria-hidden", "true")
    submitBtn.innerText = " " + submitBtn.innerText
    submitBtn.prepend(loadingSpan)

    const formData = new FormData(event.target)
    const queryString = Array.from(formData)
        .map(([key, value]) => `${key}=${value.toLowerCase()}`)
        .join('&')
    const url = baseURL + queryString

    fieldset.setAttribute("disabled", "")
    randomBtn.setAttribute("disabled", "")

    fetch(url)
        .then((response) => response.json())
        .then((json) => {
            console.log(json);
        })
        .then(() => {
            submitBtn.removeChild(loadingSpan)
            fieldset.removeAttribute("disabled")
            randomBtn.removeAttribute("disabled")
            submitBtn.removeAttribute("disabled")
        })
        .catch((error) => {
            console.log(error);
        })

    event.target.reset()
}

const getRandomActivity = () => {
    const baseURL = "https://www.boredapi.com/api/activity"

    const btn = document.getElementById(`random-activity-btn`)
    const fieldset = document.getElementById(`activity-generator`)

    const loadingSpan = document.createElement('span')
    loadingSpan.setAttribute("class", "spinner-border spinner-border-sm")
    loadingSpan.setAttribute("role", "status")
    loadingSpan.setAttribute("aria-hidden", "true")

    fieldset.setAttribute("disabled", "")
    btn.setAttribute("disabled", "")
    btn.innerText = " " + btn.innerText
    btn.prepend(loadingSpan)

    fetch(baseURL)
        .then((response) => response.json())
        .then((json) => {
            console.log(json);
        })
        .then(() => {
            btn.removeChild(loadingSpan)
            fieldset.removeAttribute("disabled")
            btn.removeAttribute("disabled")
        })
        .catch((error) => {
            console.log(error);
        })
}