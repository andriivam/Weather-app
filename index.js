const container = document.getElementById("container");
const cityInput = document.getElementById("input");
const subInput = document.getElementById("subInput");
const weatherDiv = document.getElementById("weather");
const chart = document.getElementById("myChart");
const days = document.getElementById("days");
const span = document.createElement("span");

let city = "";
let cityImg = "";
let url = "";
let img_link = "";

const getWeather = () => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      let lat = data[0].lat;
      let lon = data[0].lon;
      fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=06a618ce91f49c8e5b9ccabb5f01a732&units=metric`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          dataTemp = data.list[0].main;
          weatherDiv.innerHTML = "";
          span.innerHTML = `Time: ${data.list[0].dt_txt}`;
          weatherDiv.appendChild(span);
          weatherDiv.innerHTML += `
          <img class="img" src=${img_link} alt="avatar">
            <h3> City name: ${data.city.name}</h3>
            <p>Temperature: ${dataTemp.temp}</p>
            <p>Feels like: ${dataTemp.feels_like}</p>
            <p>Min temp: ${dataTemp.temp_min}</p>
            <p>Max temp: ${dataTemp.temp_max}</p>
            <p>Humidity: ${dataTemp.humidity}</p>
            <p>Pressure: ${dataTemp.pressure}</p>
            <p>Wind speed: ${data.list[0].wind.speed}</p>`;
          dataTemp2 = data.list[1].main;
          // creating our element
          const dataDiv = document.createElement("div");
          const hEl = document.createElement("h3");
          const spanTime = document.createElement("span");
          const pTemp = document.createElement("p");
          const pFeel = document.createElement("p");
          const pMin = document.createElement("p");
          const pMax = document.createElement("p");
          const pHumid = document.createElement("p");
          const pPress = document.createElement("p");
          const pWind = document.createElement("p");
          // display data inside of HTML ELEMENTS
          hEl.innerHTML = 'Weather fo next 3 hours'
          spanTime.innerHTML = `Time: ${data.list[1].dt_txt}`;
          pTemp.innerHTML = `Temperature: ${dataTemp2.temp}`;
          pFeel.innerHTML = `Feels like: ${dataTemp2.feels_like}`;
          pMin.innerHTML = `Min temp: ${dataTemp2.temp_min}`;
          pMax.innerHTML = `Max temp: ${dataTemp2.temp_max}`;
          pHumid.innerHTML = `Humidity: ${dataTemp2.humidity}`;
          pPress.innerHTML = `Humidity: ${dataTemp2.pressure}`;
          pWind.innerHTML = `Wind speed: ${data.list[1].wind.speed}`;
          dataDiv.appendChild(hEl);
          dataDiv.appendChild(spanTime);
           dataDiv.appendChild(pTemp);
           dataDiv.appendChild(pFeel);
           dataDiv.appendChild(pMin);
           dataDiv.appendChild(pMax);
           dataDiv.appendChild(pHumid);
           dataDiv.appendChild(pPress);
           dataDiv.appendChild(pWind);
          weatherDiv.appendChild(dataDiv);
        });
    });
};

const getCity = () => {
  fetch(
    `https://api.unsplash.com/search/photos?page=1&query=cities=${cityImg}&client_id=N4k0CputLLWbk1G8Ky54tawkCg_Exv1N3EudEOMF8cM`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data, "city data");
      img_link = data.results[0].urls.raw;
    });
};

subInput.addEventListener("click", (e) => {
  city = cityInput.value;
  url = "http://api.openweathermap.org/geo/1.0/direct?q=";
  apiId = "&appid=06a618ce91f49c8e5b9ccabb5f01a732&units=metric";
  limit = "&limit=" + days.value;
  url += city + limit + apiId;
  console.log(url);
  cityImg = cityInput.value;
  getWeather();
  acceptData();
  getCity();
});


// creating local storage and save data there
let dataStorage = [];

const acceptData = () => {
  dataStorage.push({
      cityInfo: cityInput.value
  });
  localStorage.setItem("cityInfo", JSON.stringify(dataStorage));
}

window.addEventListener('load', (e) => {
dataStorage = JSON.parse(localStorage.getItem("cityInfo"));
let city = dataStorage.map(({ cityInfo }) => cityInfo)
console.log(city)
const pCity = document.createElement('p');
pCity.innerHTML = city;
weatherDiv.appendChild(pCity);

});

/*
    // Save data tou our localStorage
    let data = [];
    localStorage.setItem("data", JSON.stringify(data));
    console.log("i am data", data);
    };

    document.body.addEventListener('onload', (e) => {
  // calling function to store data in local storage
  (() => {
    data = JSON.parse(localStorage.getItem("data")) || [];
    weatherDiv.innerHTML = data
    })();
    })
  */
