import currentWeatherFactory from "../factories/currentWeatherFactory";
import { WEATHER } from "../constants.js";
import ForecastFactory from "../factories/ForecastFactory";

const DOMManager = (() => {
  const CELCIUS_SYMBOL = "°C";

  let forecastData = null;

  const header = {
    clock: document.querySelector(".header__clock"),
  };
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
    humidity: document.querySelector(".conditions__humidity"),
    uv: document.querySelector(".conditions__uv"),
  };

  const forecast = {
    hourlyList: document.querySelector(".todays-forecast__list"),
    dailyList: document.querySelector(".forecast__list"),
  };

  function updateScreen() {
    updateHeader();
    updateHero();
    updateConditions();
    forecastData = ForecastFactory.getForecast();
    updateForecast();
  }

  function handleWeatherIcon(desc) {
    const lowercaseDesc = desc.toLowerCase();

    const weatherKeywords = {
      sunny: "SUNNY",
      clear: "SUNNY",
      cloud: "CLOUDY",
      overcast: "CLOUDY",
      rain: "RAINY",
      snow: "SNOW",
    };

    // Default icon
    let weatherIcon = "SUNNY";

    for (const keyword in weatherKeywords) {
      if (lowercaseDesc.includes(keyword)) {
        weatherIcon = weatherKeywords[keyword];
        break;
      }
    }
    return WEATHER[weatherIcon];
  }

  function updateHeader() {
    const localTimeString = currentWeatherFactory.getLocalTime();
    if (localTimeString) {
      const [date, time] = localTimeString.split(" ");
      const localDate = new Date(date);
      const options = { year: "numeric", month: "long", day: "2-digit" };
      const formattedDate = localDate.toLocaleDateString("en-US", options);
      header["clock"].textContent = formattedDate + " " + time;
    }
  }

  function updateHero() {
    hero["city"].textContent = currentWeatherFactory.getCity();
    hero["tempC"].textContent =
      currentWeatherFactory.getCurrentTemperatureC() + CELCIUS_SYMBOL;
    hero["tempDesc"].textContent =
      currentWeatherFactory.getWeatherDescription();
    hero["icon"].src = handleWeatherIcon(
      currentWeatherFactory.getWeatherDescription()
    );
  }

  function updateConditions() {
    conditions["feelsLike"].textContent =
      currentWeatherFactory.getCurrentFeelsLikeC() + CELCIUS_SYMBOL;
    conditions["wind"].textContent =
      currentWeatherFactory.getCurrentWindKPH() + " km/h";
    conditions["uv"].textContent = currentWeatherFactory.getCurrentUV();
    conditions["humidity"].textContent =
      currentWeatherFactory.getCurrentHumidity() + "%";
  }

  function updateForecast() {
    updateHourlyForecast();
    updateDailyForecast();
  }

  function updateHourlyForecast() {
    console.log(forecastData);
  }

  function updateDailyForecast() {}

  return {
    updateScreen,
  };
})();

export default DOMManager;
