const cityForm = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img");
const forecast = new Forecast();

////////////////////////////////////////////////////////
const updateUI = (data) => {
  //   const cityDets = data.cityDets;
  //   const weather = data.weather;

  //destructure properties

  const { cityDets, weather } = data;

  //update details template
  details.innerHTML = `
      <h5 class="my-3 text-4xl">${cityDets.EnglishName}</h5>
      <div class="my-3 text-2xl">${weather.WeatherText}</div>
      <div class="text-4xl my-4">
        <span>${weather.Temperature.Metric.Value}</span> 
        <span>&deg;C</span>
      </div>
      `;

  //update the night/day & icon images

  const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
  icon.setAttribute("src", iconSrc);

  let timeSrc = null;
  if (weather.IsDayTime) {
    timeSrc = "img/day.svg";
  } else {
    timeSrc = "img/night.svg";
  }

  time.setAttribute("src", timeSrc);

  //remove hidden class if it exist

  if (card.classList.contains("hidden")) {
    card.classList.remove("hidden");
  }
};

cityForm.addEventListener("submit", (e) => {
  //prevent defualt
  e.preventDefault();

  //get city value
  const city = cityForm.city.value.trim();
  cityForm.reset();

  forecast
    .updateCity(city)
    .then((data) => updateUI(data))
    .catch((err) => console.log(err));

  //set local storge
  localStorage.setItem("city", city);
});

if (localStorage.getItem("city")) {
  forecast
    .updateCity(localStorage.getItem("city"))
    .then((data) => updateUI(data))
    .catch((err) => console.log(err));
}

// const updateCity = async (city) => {
//   const cityDets = await getCity(city);

//   const weather = await getWeather(cityDets.Key);

//   //return {cityDets: cityDets,weather: weather};
//   return { cityDets, weather };
// };
