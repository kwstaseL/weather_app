import "../styles/modern-normalize.css";
import "../styles/style.css";
import "../styles/utils.css";
import "../styles/components/header.css";
import "../styles/components/hero.css";
import "../styles/components/conditions.css";
import "../styles/components/forecast.css";
import "../styles/common-container-sizes.css";
import "../styles/grid-design.css";
import currentWeatherFactory from "./currentWeatherFactory";
import DOMManager from "./DOMManager";

const submitButton = document.querySelector(".header__submit-button");
const searchBar = document.querySelector(".header__search-input");
const API_KEY = "1eb0eccd4d912649dd185743bd62f924";

async function getCoordinates() {
  const linkLatLon = `http://api.openweathermap.org/geo/1.0/direct?q=${searchBar.value}&limit=5&appid=${API_KEY}`;
  const response = await fetch(linkLatLon);
  const currentLocationData = await response.json();
  const lattitude = currentLocationData[0]["lat"];
  const longtitude = currentLocationData[0]["lon"];

  return { lattitude, longtitude };
}

submitButton.addEventListener("click", async () => {
  await currentWeatherFactory.setLocation(searchBar.value);
  DOMManager.updateScreen();
});

// Default loading
await currentWeatherFactory.setLocation("London");
DOMManager.updateScreen();
