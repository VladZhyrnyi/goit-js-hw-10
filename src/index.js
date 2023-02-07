import "./css/styles.css";

import _ from "lodash";
import Notiflix from "notiflix";
import { fetchCountries } from "./fetchCountries";

const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.getElementById("search-box"),
  countryList: document.querySelector(".country-list"),
  countryCard: document.querySelector(".country-info"),
};

refs.input.addEventListener("input", _.debounce(onInputChange, DEBOUNCE_DELAY));

function onInputChange(e) {
  refs.countryList.innerHTML = "";
  refs.countryCard.innerHTML = "";

  if (!e.target.value.trim()) {
    return
  }

  fetchCountries(e.target.value.trim())
    .then(showResult)
    .catch(() =>
      Notiflix.Notify.failure("Oops, there is no country with that name")
    );
}

function showResult(data) {
  if (data.length > 10) {
    Notiflix.Notify.info(
      "Too many matches found. Please enter a more specific name."
    );
    return;
  } else if (data.length > 1) {
    refs.countryList.innerHTML = createCountryListMarkup(data);
  } else {
    refs.countryCard.innerHTML = createCountryCardMarkup(...data);
  }
}

function createCountryListMarkup(countries) {
  return countries
    .map((item) => {
      return `
<li class="country-list__item">
  <img class="country-list__img" src='${item.flags.png}' alt='${item.name}'>
  <h2>${item.name}</h2>
</li>`;
    })
    .join("");
}

function createCountryCardMarkup(country) {
  return `
<div class="country-card">
  <img class="country-card__img" src="${country.flags.png}" alt="${country.name}">
  <div class="country-card__info">
    <h2 class="country-card__title">${country.name}</h2>
    <p><span class="country-card__info-title">Capital:</span> ${country.capital}</p>
    <p><span class="country-card__info-title">Population:</span> ${
    country.population
  }</p>
    <p><span class="country-card__info-title">Languages:</span> ${country.languages
    .map((lang) => lang.name)
    .join(", ")}</p>
  </div>
</div>`;
}
