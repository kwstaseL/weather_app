const dailyForecastCreator = (() => {
  function createListItem(day, weatherImageSrc) {
    const listItem = document.createElement("li");

    const h1 = document.createElement("h1");
    h1.className = "section__scale-value";
    h1.textContent = day;

    const img = document.createElement("img");
    img.className = "forecast__weather-img section-img";
    img.src = weatherImageSrc;
    img.alt = "";

    const div = document.createElement("div");

    listItem.appendChild(h1);
    listItem.appendChild(img);
    listItem.appendChild(div);

    // Converting the <li> element to an HTML string
    return listItem.outerHTML;
  }

  return createListItem;
})();

export default dailyForecastCreator;
