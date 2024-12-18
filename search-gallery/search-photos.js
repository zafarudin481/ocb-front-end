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
        })
        .catch(err => { debugger })
}


// function to insert list of searched photos into searched photos container
function updateSearchedPhotos(image) {
    searchContainer.innerHTML += `<img class='col' src="${image.src.portrait}" alt="${image.alt}">`
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