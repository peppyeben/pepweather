
let app = {
  main: document.querySelector('.main'),
  description: document.querySelector('.description'),
  country: document.querySelector('.country-name'),
  abbr: document.querySelector('.abbr'),
  mainIcon: document.querySelector('.main-icon'),
  temp: document.querySelector('.temp'),
  searchInfo: document.querySelector('.search-info'),
  searchBtn: document.querySelector('.search-btn')
};

window.addEventListener("load", createPWA);

app.searchInfo.addEventListener('keyup', fetchWeather);

function fetchWeather(e) {
  if(app.searchInfo.value && (e.key == "13" || e.key == "Enter" || e.keyCode == "13")) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${app.searchInfo.value}&appid=0b143f50f731f28f8e7867129f4c6e72`)
    .then(x => {
      return x.json();
    })
    .then(data => {
      localStorage.setItem('data', JSON.stringify(data));
      app.main.innerText = data.weather[0].main;
      app.description.innerText = data.weather[0].description;
      app.country.innerText = data.name;
      app.abbr.innerText = data.sys.country;
      
      app.mainIcon.src = `
      https://openweathermap.org/img/w/${data.weather[0].icon}.png
      `;
      app.temp.innerText = (data.main.temp - 273).toFixed(2) + '°';
    })
    .catch(e => {
      data = JSON.parse(localStorage.getItem('data'));
      app.main.innerText = data.weather[0].main;
      app.description.innerText = data.weather[0].description;
      app.country.innerText = data.name;
      app.abbr.innerText = data.sys.country;
      app.mainIcon.src = `
      ../assets/${data.weather[0].icon}.png
      `;
      app.temp.innerText = (data.main.temp - 273).toFixed(2) + '°';
    
      console.log(data);
    });
  }
}

function createPWA(){
    if("serviceWorker" in navigator){
    navigator.serviceWorker.register("sw.js").then(reg => {
      console.log(reg);
    }).catch(e => {
      console.log(e);
    });
  }
}
