var pexelsKey = config.PEXELS_KEY

const backgroundImage = document.querySelector('header')
const photoCredit = document.getElementById('photo-credit')

fetch('https://api.pexels.com/v1/search?query=nature&per_page=10', {
    headers: {
        'Authorization': `${pexelsKey}`
    }
})
    .then(response => response.json())
    .then(body => {
        const imageHeader = body.photos[Math.ceil(Math.random() * 10)]
        backgroundImage.style.backgroundImage = `url('${imageHeader.src.original}')`
        photoCredit.setAttribute('alt', `${imageHeader.alt}`)
        photoCredit.innerHTML = `Photo by ${imageHeader.photographer}`
    })
    .catch(err => {
        alertError(err.message)
    })

// function to handle error message
function alertError(message) {
    alert(message);
}