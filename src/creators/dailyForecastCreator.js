const dailyForecastCreator = (() => {
  function createListItem(day, weatherImageSrc, temperature) {
    const listItem = document.createElement("li");

    const h1 = document.createElement("h1");
    h1.className = "section__scale-value forecast__day";
    h1.textContent = day;

    const img = document.createElement("img");
    img.className = "forecast__weather-img section-img";
    img.src = weatherImageSrc;
    img.alt = "";

    const temp = document.createElement("h1");
    temp.className = "forecast__temp";
    temp.textContent = temperature;

    listItem.appendChild(h1);
    listItem.appendChild(img);
    listItem.appendChild(temp);

    return listItem;
  }

  return { createListItem };
})();

export default dailyForecastCreator;
