const ASSET_PATH = "./public/assets/";

const API_KEY = "1eb0eccd4d912649dd185743bd62f924";

const WEATHER = {
  SUNNY: ASSET_PATH + "sun.png",
  CLOUDY: ASSET_PATH + "cloudy.png",
  RAINY: ASSET_PATH + "rainy.png",
  SNOW: ASSET_PATH + "snow.png",
};

function convertKelvinToC(kelvin) {
  const DIFFERENCE = 273.15;
  return parseFloat(kelvin - DIFFERENCE).toFixed(1);
}

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export { WEATHER, API_KEY, DAY_NAMES, convertKelvinToC };
