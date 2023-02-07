export function fetchCountries(query) {
  const sQuery = query.trim() + "?fields=name,capital,population,flags,languages";

  return fetch(`https://restcountries.com/v2/name/${sQuery}`)
    .then((res) => res.json());
}
