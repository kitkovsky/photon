"use strict";
const auth = "563492ad6f91700001000001e5ba829308784e248f510c24304dcb17";
const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
const submitButton = document.querySelector(".submit-button");
async function getCuratedPhotos() {
    const fetchedData = await fetch("https://api.pexels.com/v1/curated?page=1&per_page=20", {
        method: "GET",
        headers: {
            Accept: "appilcation/json",
            Authorization: auth,
        },
    });
    const data = await fetchedData.json();
    // TODO: add an interface for the photo object and map through the original returned data
    // to grab only the values that i'm interested in
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
getCuratedPhotos();
