var pexelsKey = config.PEXELS_KEY

const homeImages = document.getElementById('photos-container')
const loadMore = document.getElementById('load-more')
let nextPageURL

fetchPhotos()

// function to fetch and display photos
function fetchPhotos(url = 'https://api.pexels.com/v1/curated') {
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
            onVisible(loadMore, () => fetchPhotos(nextPageURL));
        })
        .catch(err => { debugger })
}

// function to insert list of photos into photos container
function updateHomePhotos(image) {
    homeImages.innerHTML += `<img class='col' src="${image.src.portrait}" alt="${image.alt}">`
}

// function to trigger load more photos
function onVisible(element, callback) {
    new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.intersectionRatio > 0) {
                callback(element);
                observer.disconnect();
            }
        });
    }).observe(element);
    if (!callback) return new Promise(r => callback = r);
}
