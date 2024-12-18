var pexelsKey = config.PEXELS_KEY

const searchInput = document.getElementById('search-photos')
const searchContainer = document.getElementById('photos-container')
const containerTitle = document.getElementById('container-title')
let linkAPI
let nextSearchedPageURL


// function to search photo
function searchPhotos() {
    validateInput() ? alert("Please type the keyword you want to search") : (
        updateContainerTitle(searchInput.value),
        setAttributeButton(),
        searchContainer.innerHTML = "",
        linkAPI = `https://api.pexels.com/v1/search?query=${searchInput.value}`,
        fetchSearch(linkAPI))
}

// function to validate the search input
function validateInput() {
    if (searchInput.value == null || searchInput.value == "") {
        return true
    } else {
        return false
    }
}

// function to search photos through API
function fetchSearch(url) {
    showLoadingSpinners(true);
    fetch(url, {
        headers: {
            'Authorization': `${pexelsKey}`
        }
    })
        .then(response => response.json())
        .then(body => {
            const photosList = body.photos.map((images, index) => body.photos[index])
            nextSearchedPageURL = body.next_page
            return photosList
        })
        .then(photosList => {
            photosList.forEach((image) => {
                updateSearchedPhotos(image);
            });
            showLoadingSpinners(false);
        })
        .catch(err => {
            alertError(err.message)
        })
}


// function to insert list of searched photos into searched photos container
function updateSearchedPhotos(image) {
    searchContainer.innerHTML += `<div class="col"><img src="${image.src.portrait}" alt="${image.alt}">` +
        `<a href="${image.url}">Photos by ${image.photographer}</a></div>`
}

// function to update the container title
function updateContainerTitle(keyword) {
    containerTitle.innerHTML = ""
    containerTitle.innerHTML = `Your search: ${keyword}`
}

// function to load more searched photos
function loadSearchedPhotos() {
    fetchSearch(nextSearchedPageURL);
}

// function to set new onclick attribute to the load more button
function setAttributeButton() {
    const loadMoreButton = document.getElementById('load-more');
    loadMoreButton.setAttribute("onclick", "javascript: loadSearchedPhotos()");
}