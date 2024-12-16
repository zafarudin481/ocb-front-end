var pexelsKey = config.PEXELS_KEY

let homeImages = document.getElementById('photos-container')

fetch('https://api.pexels.com/v1/curated', {
    headers: {
        'Authorization': `${pexelsKey}`
    }
})
    .then(response => response.json())
    .then(body => {
        const photosList = body.photos.map((images, index) => body.photos[index])
        return photosList
    })
    .then(photosList => {
        photosList.forEach((image) => {
            updateHomePhotos(image)
        });
    })
    .catch(err => { debugger })

// function to insert list of photos into home
function updateHomePhotos(image) {
    homeImages.innerHTML += `<img class='col' src="${image.src.medium}" alt="${image.src.alt}">`
    console.log("success")
}