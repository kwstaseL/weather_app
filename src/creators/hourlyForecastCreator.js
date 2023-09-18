const hourlyForecastCreator = (() => {
  function createTodaysForecastEntry(time, weatherImageSrc, temperature) {
    const listItem = document.createElement("li");
    listItem.className = "todays-forecast__entry";

    const timeH1 = document.createElement("h1");
    timeH1.className = "todays-forecast__time";
    timeH1.textContent = time;

    const img = document.createElement("img");
    img.className = "todays-forecast__img";
    img.src = weatherImageSrc;
    img.alt = "";

    const tempH1 = document.createElement("h1");
    tempH1.className = "todays-forecast__temp";
    tempH1.textContent = temperature;

    listItem.appendChild(timeH1);
    listItem.appendChild(img);
    listItem.appendChild(tempH1);

    // Converting the <li> element to an HTML string
    return listItem.outerHTML;
  }

  return createTodaysForecastEntry;
})();

export default hourlyForecastCreator;
