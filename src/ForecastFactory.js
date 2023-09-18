import { API_KEY } from "./constants";

const ForecastFactory = (() => {
  let forecastData = null;

  async function setLocation(lat, lon) {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );
    forecastData = await response.json();
    console.log(forecastData);
  }

  return {
    setLocation,
  };
})();

export default ForecastFactory;
