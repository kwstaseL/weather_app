import { API_KEY } from "../constants";

const ForecastFactory = (() => {
  let forecastDataArray = null;

  let forecast = [];

  function initForecast() {
    if (!forecastDataArray) return;

    forecast = [];
    let day = {
      hourlyWeather: [],
    };

    forecastDataArray.forEach((timeFrame) => {
      const timeFrameCaptured = timeFrame.dt_txt.split(" ");
      const dateCaptured = timeFrameCaptured[0];
      const timeCaptured = timeFrameCaptured[1];

      if (timeCaptured === "00:00:00") {
        if (day.hourlyWeather.length > 0) {
          // Calculate the average temperature for the previous day
          const totalTemperature = day.hourlyWeather.reduce(
            (sum, data) => sum + data.temperature,
            0
          );
          day.averageTemperature = totalTemperature / day.hourlyWeather.length;

          // Find the predominant weather description based on occurrence frequency
          const weatherCounts = {};
          day.hourlyWeather.forEach((data) => {
            const description = data.description.toLowerCase();
            weatherCounts[description] = (weatherCounts[description] || 0) + 1;
          });

          let maxCount = 0;
          let predominantDescription = "unknown"; // Default value
          for (const description in weatherCounts) {
            if (weatherCounts[description] > maxCount) {
              maxCount = weatherCounts[description];
              predominantDescription = description;
            }
          }
          day.weatherSummary = predominantDescription;
        }

        // New day begins, creating a new day object
        day = {
          hourlyWeather: [],
        };
        day.date = dateCaptured;
        forecast.push(day);
      }
      day.hourlyWeather.push({
        date: dateCaptured,
        time: timeCaptured,
        temperature: timeFrame.main.temp,
        description: timeFrame.weather[0].description.toLowerCase(),
      });
    });

    // Calculating the average temperature and findings the predominant description for the last day
    if (day.hourlyWeather.length > 0) {
      const totalTemperature = day.hourlyWeather.reduce(
        (sum, data) => sum + data.temperature,
        0
      );
      day.averageTemperature = totalTemperature / day.hourlyWeather.length;

      const weatherCounts = {};
      day.hourlyWeather.forEach((data) => {
        const description = data.description.toLowerCase();
        weatherCounts[description] = (weatherCounts[description] || 0) + 1;
      });
      let maxCount = 0;
      let predominantDescription = "unknown";
      for (const description in weatherCounts) {
        if (weatherCounts[description] > maxCount) {
          maxCount = weatherCounts[description];
          predominantDescription = description;
        }
      }
      day.weatherSummary = predominantDescription;
    }

    forecast.push(day);
    console.log(forecast);
  }

  async function setLocation(lat, lon) {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );
    forecastDataArray = (await response.json()).list;
    initForecast();
  }

  function getForecast() {
    return forecast;
  }

  return {
    setLocation,
    getForecast,
  };
})();

export default ForecastFactory;
