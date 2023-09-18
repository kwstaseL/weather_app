import "../styles/modern-normalize.css";
import "../styles/style.css";
import "../styles/utils.css";
import "../styles/components/header.css";
import "../styles/components/hero.css";
import "../styles/components/conditions.css";
import "../styles/components/forecast.css";
import "../styles/components/todays_forecast.css";
import "../styles/common-section-sizes.css";
import "../styles/grid-design.css";
import currentWeatherFactory from "./factories/currentWeatherFactory";
import DOMManager from "./managers/DOMManager";
import { API_KEY } from "./constants";
import ForecastFactory from "./factories/ForecastFactory";

const submitButton = document.querySelector(".header__submit-button");
const searchBar = document.querySelector(".header__search-input");

async function getCoordinates() {
  const linkLatLon = `http://api.openweathermap.org/geo/1.0/direct?q=${searchBar.value}&limit=5&appid=${API_KEY}`;
  const response = await fetch(linkLatLon);
  const currentLocationData = await response.json();
  const latitude = currentLocationData[0]["lat"];
  const longitude = currentLocationData[0]["lon"];

  return { latitude, longitude };
}

submitButton.addEventListener("click", async () => {
  const { latitude, longitude } = await getCoordinates();
  await currentWeatherFactory.setLocation(searchBar.value);
  await ForecastFactory.setLocation(latitude, longitude);
  DOMManager.updateScreen();
});

// Default loading
const linkLatLon = `http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=1eb0eccd4d912649dd185743bd62f924`;
const response = await fetch(linkLatLon);
const currentLocationData = await response.json();
const latitude = currentLocationData[0]["lat"];
const longitude = currentLocationData[0]["lon"];
await ForecastFactory.setLocation(latitude, longitude);
await currentWeatherFactory.setLocation("London");
DOMManager.updateScreen();
