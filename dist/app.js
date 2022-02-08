"use strict";
// TODO: use the official pexels npm wrapper
const auth = "563492ad6f91700001000001e5ba829308784e248f510c24304dcb17"; // TODO: not the end of the world, but not ideal
const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
const submitButton = document.querySelector(".submit-button");
submitButton.addEventListener("click", search);
function search(event) {
    event.preventDefault();
    gallery.innerHTML = "";
    getQueryPhotos(searchInput.value);
}
function createGallery(data) {
    data.photos.forEach((photo) => {
        const galleryImage = document.createElement("div");
        galleryImage.classList.add("gallery-image");
        galleryImage.innerHTML = `
    <img src=${photo.src.large}></img>
    <p> ${photo.photographer}</p>
    `;
        gallery.appendChild(galleryImage);
    });
}
async function fetchApi(url) {
    // TODO: add an interface for the photo object and map through the original returned data
    // to grab only the values that i'm interested in
    const fetchedData = await fetch(url, {
        method: "GET",
        headers: {
            Accept: "appilcation/json",
            Authorization: auth,
        },
    });
    const parsedData = await fetchedData.json();
    return parsedData;
}
async function getCuratedPhotos() {
    const data = await fetchApi("https://api.pexels.com/v1/curated?page=1&per_page=20");
    createGallery(data);
}
async function getQueryPhotos(query) {
    const data = await fetchApi(`https://api.pexels.com/v1/search?query=${query}&page=1&per_page=20`);
    createGallery(data);
}
getCuratedPhotos();
