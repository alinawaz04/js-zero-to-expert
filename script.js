"use strict";

/*
const countriesContainer = document.querySelector(".countries");

const renderCountry = function (data, className = "") {
  const html = `
        <article class="country ${className}">
            <img class="country__img" src="${data.flag}" />
            <div class="country__data">
                <h3 class="country__name">${data.name}</h3>
                <h4 class="country__region">${data.region}</h4>
                <p class="country__row"><span>👫</span>${(
                  data.population / 1000000
                ).toFixed(1)} million people</p>
                <p class="country__row"><span>🗣️</span>${
                  data.languages[0].name
                }</p>
                <p class="country__row"><span>💰</span>${
                  data.currencies[0].name
                }</p>
            </div>
        </article>`;

  countriesContainer.insertAdjacentHTML("beforeend", html);
  countriesContainer.style.opacity = 1;
};

const whereAmI = function (lat, lon) {
  fetch(
    `https://us1.locationiq.com/v1/reverse?key=pk.92a63246f5d68429169bf73abfc37e54&lat=${lat}&lon=${lon}&format=json`
  )
    .then((response) => {
      console.log(response);

      if (!response.ok) {
        throw new Error(`${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      const city = data.address.city;
      const country = data.address.country;
      console.log(`You are in ${city}, ${country}`);
      return fetch(`https://restcountries.com/v2/name/${country}`);
    })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      renderCountry(data[0]);
    });

  // render country
};

whereAmI(52.508, 13.381);
whereAmI(19.037, 72.873);
whereAmI(-33.933, 18.474);
*/

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const image = document.createElement("img");
    image.src = imgPath;
    image.classList.add("images");

    image.addEventListener("load", function () {
      document.body.append(image);
      resolve(image);
    });
  });
};
const images = ["img/img-1.jpg", "img/img-2.jpg", "img/img-3.jpg"];

// createImage("img/img-1.jpg").then((img) => {
//   return new Promise(function (resolve) {
//     setTimeout(function () {
//       img.style.display = "none";
//       resolve(img);
//     }, 2000);
//   })
//     .then(() => {
//       return createImage("img/img-2.jpg");
//     })
//     .then((img) => {
//       return new Promise(function (resolve) {
//         setTimeout(function () {
//           img.style.display = "none";
//           resolve(img);
//         }, 2000);
//       });
//     })
//     .then(() => {
//       return createImage("img/img-3.jpg");
//     })
//     .catch((err) => console.log(err));
// });

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

// const loadNPause = async function () {
//   let image = await createImage("img/img-1.jpg");
//   await wait(2);
//   image.style.display = "none";
//   image = await createImage("img/img-2.jpg");
//   await wait(2);
//   image.style.display = "none";
//   image = await createImage("img/img-3.jpg");
// };

// loadNPause();

const loadAll = async function (imgArr) {
  try {
    const imgs = imgArr.map(async (img) => await createImage(img));
    const imgsEl = await Promise.all(imgs);
    console.log(imgsEl);
    imgsEl.forEach((img) => img.classList.add("parallel"));
  } catch (err) {
    console.error(err);
  }
};
loadAll(["img/img-1.jpg", "img/img-2.jpg", "img/img-3.jpg"]);
