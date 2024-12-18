var pexelsKey = config.PEXELS_KEY

const homeImages = document.getElementById('photos-container')
const loadMore = document.getElementById('load-more')
let nextPageURL

fetchPhotos()

// function to fetch and display photos
function fetchPhotos(url = 'https://api.pexels.com/v1/curated') {
    showLoadingSpinners(true);
    fetch(url, {
        headers: {
            'Authorization': `${pexelsKey}`
        }
    })
        .then(response => response.json())
        .then(body => {
            const photosList = body.photos.map((images, index) => body.photos[index])
            nextPageURL = body.next_page
            return photosList
        })
        .then(photosList => {
            photosList.forEach((image) => {
                updateHomePhotos(image)
            });
            showLoadingSpinners(false);
        })
        .catch(err => {
            alertError(err.message)
        })
}

// function to insert list of photos into photos container
function updateHomePhotos(image) {
    homeImages.innerHTML += `<div class="col"><img src="${image.src.portrait}" alt="${image.alt}">` +
        `<a href="${image.url}">Photos by ${image.photographer}</a></div>`
}

// function to load more home photos
function loadHomePhotos() {
    fetchPhotos(nextPageURL);
}

// function to show loading spinners
function showLoadingSpinners(status) {
    const loadingSpinner = document.getElementById('loading-spinner')
    const loadMoreButton = document.getElementById('load-more')
    let visibility
    let notVisibility

    status == true ? (visibility = "visible", notVisibility = "invisible") : (visibility = "invisible", notVisibility = "visible");

    loadingSpinner.setAttribute("class", `spinner-border text-primary ${visibility}`)
    loadMoreButton.setAttribute("class", `btn btn-primary ${notVisibility}`)
}