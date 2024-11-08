document.querySelector("#search").addEventListener("submit", async (event) => {
  event.preventDefault();

  const city_name = document.querySelector("#city_name").value.trim();
  if(!city_name){
    document.querySelector("#weather").classList.remove('show');
    showAlert("You need to enter a valid city...")
    return
  }
  const keyApi = "5b72c8d8fd7bdc4e1a45681fa058f566";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(
    city_name
  )}&appid=${keyApi}&units=metric&lang=pt-br`;

  const result = await fetch(apiUrl);
  const json = await result.json();

  if(json.cod === 200){
        showData({
        city: json.name,
        country: json.sys.country,
        temp: json.main.temp,
        tempMax: json.main.temp_max,
        tempMin: json.main.temp_min,
        description: json.weather[0].description,
        tempIcon: json.weather[0].icon,
        windSpeed: json.wind.speed,
        humidity: json.main.humidity,
    });
  }else{
    return showAlert(`City not found...
        
        <img src="src/images/undraw_cat_epte.svg" alt="">`)
  }

  console.log(json);
});

function showAlert(mensagem) {
  document.querySelector("#weather").classList.remove('show');
  document.querySelector("#alert").innerHTML = mensagem;
}

function showData(json) {
  showAlert("");
  
  document.querySelector("#weather").classList.add('show');
  document.querySelector("#title").innerHTML = `${json.city}, ${json.country}`
  document.querySelector('#temp_value').innerHTML = `${json.temp.toFixed(1).toString().replace(".",",")} <sup>°C</sup>`
  document.querySelector('#temp_description').innerHTML = `${json.description}`;
  document.querySelector('#temp_img').setAttribute('src',`https://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
  document.querySelector('#temp_max').innerHTML = `${json.tempMax.toFixed(1).toString().replace(".",",")} <sup>°C</sup>`;
  document.querySelector('#temp_min').innerHTML = `${json.tempMin.toFixed(1).toString().replace(".",",")} <sup>°C</sup>`;
  document.querySelector('#humidity').innerHTML = `${json.humidity}%`;
  document.querySelector('#wind').innerHTML = `${json.windSpeed.toFixed(1)}Km/h`;

}

