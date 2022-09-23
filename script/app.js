const cityForm = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");

const updateUI = (data) => {
  console.log(data);
  const cityDets = data.cityDets;
  const weather = data.weather;

  //update details template
  details.innerHTML = `
      <h5 class="my-3">${cityDets.EnglishName}</h5>
      <div class="my-3">${weather.WeatherText}</div>
      <div class="text-4xl my-4">
        <span>${weather.Temperature.Metric.value}</span>
        <span>&deg;C</span>
      </div>
      `;

  //remove hidden class if it exist

  if (card.classList.contains("hidden")) {
    card.classList.remove("hidden");
  }
};

const updateCity = async (city) => {
  const cityDets = await getCity(city);
  const weather = await getWeather(cityDets.key);

  //return {cityDets: cityDets,weather: weather};
  return { cityDets, weather };
};

cityForm.addEventListener("submit", (e) => {
  //prevent defualt
  e.preventDefault();

  //get city value
  const city = cityForm.city.value.trim();
  cityForm.reset();

  updateCity(city)
    .then((data) => updateUI(data))
    .catch((err) => console.log(err));
});
