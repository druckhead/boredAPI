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
            const alert = document.getElementById(`errorAlert`)
            if (`error` in json) {
                alert.classList.remove(`alert-success`)
                alert.classList.add(`alert-danger`)
                alert.innerText = `No activity found with these filters, please try again.`
                alert.classList.remove(`d-none`)
            } else {
                alert.classList.remove(`alert-danger`)
                alert.classList.add(`alert-success`)
                alert.innerText = `Activity added successfuly!`
                alert.classList.remove(`d-none`)

                const item = document.createElement(`li`)
                const text = document.createElement(`p`)
                const deleteButton = document.createElement(`button`)

                text.setAttribute('class', 'h6 d-inline m-0')
                deleteButton.setAttribute('type', 'button')
                deleteButton.setAttribute('aria-label', 'Close')
                deleteButton.setAttribute('class', 'btn btn-outline-danger btn-sm')
                deleteButton.innerHTML = 'X'
                deleteButton.setAttribute('onclick', 'removeItemFromList(this)')

                item.setAttribute("class", "list-group-item d-flex justify-content-between align-items-center")
                if (json.price > 0.0) {
                    const times = json.price * 10.0 === 0 ? 1 : json.price * 10.0
                    text.innerHTML = `${json.activity}, up to ${json.participants} people. Price: ${`$`.repeat(times)}`
                } else {
                    text.innerHTML = `${json.activity}, up to ${json.participants} people.`
                }
                item.appendChild(text)
                item.appendChild(deleteButton)
                const activityList = document.getElementById("activities");
                activityList.insertBefore(item, activityList.firstChild);
            }
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

const clearAll = () => {
    if (confirm(`Are you sure? This can't be undone.`)) {
        const activityList = document.getElementById('activities')
        let first = activityList.firstChild
        while (first) {
            first.remove()
            first = activityList.firstChild
        }
    }
}

function removeItemFromList(btn) {
    parentItem = btn.parentNode
    parentItem.remove()
}