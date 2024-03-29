'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
// I guess a bug, if there is one, is here 
const renderCountry = function(data, className = '') {
  const languages = Object.values(data.languages); 
  const currencies = Object.values(data.currencies);
  const html = `
  <article class="country ${className}">
        <img class="country__img" src="${data.flags.png}" />
        <div class="country__data">
          <h3 class="country__name">${data.name.common}</h3>
          <h4 class="country__region">${data.region}</h4>
          <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)} people</p>
          <p class="country__row"><span>🗣️</span>${languages[0]}</p>
          <p class="country__row"><span>💰</span>${currencies[0].name}</p>
        </div>
      </article>
      `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};
const renderError = function(msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};
const getPosition = function() {
  return new Promise(function(resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject)
  });
};
const whereAmI = function() {
  getPosition().then(pos => {
      const {
        latitude: lat,
        longitude: lng
      } = pos.coords;
      return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json&auth=14406727700812e15917873x5516`)
    })
    .then(res => {
      if (!res.ok) throw new Error(`problem with geocoding ${res.status}`);
      return res.json()
    })
    .then(data => {
      console.log(data);
      console.log(`you are in ${data.city} , ${data.country}`);
      const ülke = fetch(`https://restcountries.com/v3.1/name/${data.country}`)
      console.log(`https://restcountries.com/v3.1/alpha/${`[https://restcountries.com/v3.1/name/${data.country}].borders`}`)
      console.log(ülke)
      return ülke
    })
    .then(res => {
      if (!res.ok) throw new Error(`country not found (${res.status})`);
      return res.json();
    })
    .then(data => renderCountry(data[0]))
    .catch(err => console.error(`${err.message}💀💀💀`));
};

btn.addEventListener('click', whereAmI)

// fetch(`https://geocode.xyz/52.508,13.381?geoit=json`).then(
//     response => response.json()
// ).then(responseJson => {console.log(responseJson)})