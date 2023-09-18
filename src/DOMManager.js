import currentWeatherFactory from "./currentWeatherFactory";
import { WEATHER } from "./constants.js";

const DOMManager = (() => {
  const CELCIUS_SYMBOL = "°C";
  const hero = {
    icon: document.querySelector(".hero__weather-img"),
    city: document.querySelector(".hero__weather-location"),
    tempC: document.querySelector(".hero__weather-temp"),
    tempDesc: document.querySelector(".hero__weather-desc"),
    minmaxT: document.querySelector(".hero__weather-hl"),
  };
  const conditions = {
    feelsLike: document.querySelector(".conditions__feels-like"),
    wind: document.querySelector(".conditions__wind"),
    rain: document.querySelector(".conditions__rain"),
    uv: document.querySelector(".conditions__uv"),
  };

  function handleWeatherIcon(desc) {
    const lowercaseDesc = desc.toLowerCase();

    const weatherKeywords = {
      sunny: "SUNNY",
      cloud: "CLOUDY",
      rain: "RAINY",
      snow: "SNOW",
    };

    let weatherIcon = "DEFAULT_ICON";

    for (const keyword in weatherKeywords) {
      if (lowercaseDesc.includes(keyword)) {
        weatherIcon = weatherKeywords[keyword];
        break;
      }
    }
    console.log(WEATHER[weatherIcon]);
    hero["icon"].src = WEATHER[weatherIcon];
  }

  function updateHero() {
    hero["city"].textContent = currentWeatherFactory.getCity();
    hero["tempC"].textContent =
      currentWeatherFactory.getCurrentTemperatureC() + CELCIUS_SYMBOL;
    console.log(currentWeatherFactory.getConditions());
    console.log(currentWeatherFactory.getConditions()["text"]);
    hero["tempDesc"].textContent =
      currentWeatherFactory.getConditions()["text"];
    handleWeatherIcon(currentWeatherFactory.getConditions()["text"]);
  }

  function updateConditions() {
    conditions["feelsLike"].textContent =
      currentWeatherFactory.getCurrentFeelsLikeC() + CELCIUS_SYMBOL;
    conditions["wind"].textContent =
      currentWeatherFactory.getCurrentWindKPH() + " km/h";
    conditions["uv"].textContent = currentWeatherFactory.getCurrentUV();
  }

  function updateScreen() {
    updateHero();
    updateConditions();
  }

  return {
    updateScreen,
  };
})();

export default DOMManager;
