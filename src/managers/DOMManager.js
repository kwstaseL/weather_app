import currentWeatherFactory from "../factories/currentWeatherFactory";
import { WEATHER, DAY_NAMES, convertKelvinToC } from "../constants.js";
import ForecastFactory from "../factories/ForecastFactory";
import dailyForecastCreator from "../creators/dailyForecastCreator";
import hourlyForecastCreator from "../creators/hourlyForecastCreator";

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

  function clearScreen() {
    forecast["hourlyList"].innerHTML = "";
    forecast["dailyList"].innerHTML = "";
  }

  function updateScreen() {
    clearScreen();
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
    const dailyData = forecastData.filter(
      (weatherData) =>
        weatherData.date === currentWeatherFactory.getLocalTime().split(" ")[0]
    );
    dailyData.forEach((data) => {
      const hourlyData = data.hourlyWeather;
      hourlyData.forEach((data) => {
        const time = data.time.split(":");
        const hour = time[0] + ":" + time[2];
        const icon = handleWeatherIcon(data.description);
        const temp = convertKelvinToC(data.temperature) + CELCIUS_SYMBOL;

        const list_item = hourlyForecastCreator.createTodaysForecastEntry(
          hour,
          icon,
          temp
        );
        forecast["hourlyList"].appendChild(list_item);
      });
    });
  }

  function updateDailyForecast() {
    forecastData.forEach((dailyWeatherData) => {
      console.log(dailyWeatherData);
      const captureDate = dailyWeatherData.date;
      const avgTemperature = dailyWeatherData.averageTemperature;
      const date = new Date(captureDate);
      const dayIndex = date.getDay();
      const list_item = dailyForecastCreator.createListItem(
        DAY_NAMES[dayIndex],
        handleWeatherIcon(dailyWeatherData.weatherSummary),
        convertKelvinToC(avgTemperature) + CELCIUS_SYMBOL
      );
      forecast["dailyList"].appendChild(list_item);
    });
  }

  return {
    updateScreen,
  };
})();

export default DOMManager;
