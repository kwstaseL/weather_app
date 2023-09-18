const currentWeatherFactory = (() => {
  let currentLocationData = null;

  async function setLocation(location) {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=519bc89f260647f197652409233008&q=${location}`
    );
    currentLocationData = await response.json();
    console.log(currentLocationData);
  }

  //   Location Getters

  function getCountry() {
    return currentLocationData != null
      ? currentLocationData.location.country
      : null;
  }

  function getCity() {
    return currentLocationData != null
      ? currentLocationData.location.name
      : null;
  }

  /**
   *
   * @returns The local time of the current Location that the user selected in the
   * form of YEAR-MONTH-DAY <1-BLANK> TIME
   */
  function getLocalTime() {
    return currentLocationData != null
      ? currentLocationData.location.localtime
      : null;
  }

  //   Temperature Getters

  function getCurrentCloudiness() {
    return currentLocationData != null
      ? currentLocationData.current.cloud
      : null;
  }

  function getCurrentFeelsLikeC() {
    return currentLocationData != null
      ? currentLocationData.current.feelslike_c
      : null;
  }

  /**
   * @returns A pair of the condition (ex. Sunny, Stormy etc)
    and the associated temperature icon corresponding to that condition
   */
  function getConditions() {
    return currentLocationData != null
      ? currentLocationData.current.condition
      : null;
  }

  function getCurrentTemperatureC() {
    return currentLocationData != null
      ? currentLocationData.current.temp_c
      : null;
  }

  function getCurrentWindDirection() {
    return currentLocationData != null
      ? currentLocationData.current.wind_dir
      : null;
  }

  function getCurrentWindKPH() {
    return currentLocationData != null
      ? currentLocationData.current.wind_kph
      : null;
  }

  function getCurrentUV() {
    return currentLocationData != null ? currentLocationData.current.uv : null;
  }

  function getCurrentHumidity() {
    return currentLocationData != null
      ? currentLocationData.current.humidity
      : null;
  }

  function isDay() {
    if (currentLocationData == null) {
      return null;
    }
    return currentLocationData.is_day;
  }

  return {
    setLocation,
    getCountry,
    getLocalTime,
    getCity,
    getCurrentCloudiness,
    getCurrentFeelsLikeC,
    getConditions,
    getCurrentTemperatureC,
    getCurrentWindDirection,
    getCurrentWindKPH,
    getCurrentUV,
    getCurrentHumidity,
    isDay,
  };
})();

export default currentWeatherFactory;
