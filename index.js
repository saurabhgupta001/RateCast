//java script for excees currency converter.
const count_list = {AED: "AE",
AUD: "AU",
BGN: "BG",
BRL: "BR",
CAD: "CA",
CHF: "CH",
CNY: "CN",
CZK: "CZ",
DKK: "DK",
EUR: "FR",
GBP: "GB",
HKD: "HK",
HUF: "HU",
IDR: "ID",
ILS: "IL",
INR: "IN",
ISK: "IS",
JPY: "JP",
KRW: "KR",
MXN: "MX",
MYR: "MY",
NOK: "BV",
NZD: "NZ",
PHP: "PH",
PLN: "PL",
RON: "RO",
SEK: "SE",
SGD: "SG",
THB: "TH",
TRY: "TR",
USD: "US",
ZAR: "ZA"
};
const APi_url = "https://api.frankfurter.app/latest?amount=1";
const dropdown = document.querySelectorAll(".selection select");
const btn = document.querySelector("form button");
const fromcurr = document.querySelector(".selector1 select");
var tocurr = document.querySelector(".selector2 select");
var msg = document.getElementById("result");


for (let select of dropdown) {
    for (currcode in count_list) {
        let newoption = document.createElement("option");
        newoption.innerText = currcode;
        newoption.value = currcode;
        if (select.name === "from" && currcode === "USD") {
            newoption.selected = "selected";
        }
        else if (select.name === "to" && currcode === "INR") {
            newoption.selected = "selected";
        }
        select.append(newoption);
    }
    select.addEventListener("change", (e) => {
        updateflag(e.target);
    });
}

const updateflag = (e) => {
    let councode = e.value;
    let countrycode = count_list[councode];
    let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let img = e.parentElement.querySelector("img");
    img.src = newsrc;
};

btn.addEventListener("click", async (e) => {
    e.preventDefault();
    let amount = document.querySelector("form input");
    let amvalue = amount.value;
    if (amvalue == "" || amvalue<1 || isNaN(amvalue)) {
        alert("Please Enter An Valid Amount");
    }else{
    //console.log(amount.value);
    //console.log(fromcurr.value, tocurr.value);

    const url = `${APi_url}&from=${fromcurr.value.toUpperCase()}&to=${tocurr.value.toUpperCase()}`;
    let response = await fetch(url);
    console.log(response);
    let data = await response.json();
    console.log(data);
    console.log(data.rates);
    let rate = data.rates[tocurr.value.toUpperCase()];
    console.log(rate);
    let finalamount = amvalue * rate;
    console.log(msg.innerText);
    msg.innerText = `${amvalue} ${fromcurr.value} = ${finalamount} ${tocurr.value}`;
    console.log(msg.innerText);
}
});

// javascript for excess weather report
var a = document.getElementById("a");
var b = document.getElementById("b");
var c = document.getElementById("c");
 var c1 = document.getElementById("c1");
 var m = document.getElementById("m");
 var m1 = document.getElementById("m1");
var body = document.getElementById("body");
console.log(c.style.display);
console.log(body.style);
function whe(){
    c.style.display = "none";
    c1.style.display = "block";
    body.style.background = "#267fbe";
    b.style.background = " rgb(163, 160, 160)";
    a.style.background = "white";
    m1.style.display = "block";
    m.style.display = "none";
    
}
function cur(){
    c.style.display = "block";
    c1.style.display = "none";
    body.style.background = "bisque";
    a.style.background = " rgb(163, 160, 160)"
    b.style.background = "white";
    m1.style.display = "none";
    m.style.display = "block";
}
const btn1 = document.getElementById('get-weather');
const cityInput = document.getElementById('city');
const wResult = document.getElementById('weather-output');

const weatherDescriptions = {
  0: 'Clear sky',
  1: 'Mainly clear',
  2: 'Partly cloudy',
  3: 'Overcast',
  45: 'Fog',
  48: 'Depositing rime fog',
  51: 'Light drizzle',
  53: 'Moderate drizzle',
  55: 'Dense drizzle',
  56: 'Light freezing drizzle',
  57: 'Dense freezing drizzle',
  61: 'Slight rain',
  63: 'Moderate rain',
  65: 'Heavy rain',
  66: 'Light freezing rain',
  67: 'Heavy freezing rain',
  71: 'Slight snow fall',
  73: 'Moderate snow fall',
  75: 'Heavy snow fall',
  77: 'Snow grains',
  80: 'Slight rain showers',
  81: 'Moderate rain showers',
  82: 'Violent rain showers',
  85: 'Slight snow showers',
  86: 'Heavy snow showers',
  95: 'Thunderstorm (no hail)',
  96: 'Thunderstorm with slight hail',
  99: 'Thunderstorm with heavy hail'
};

btn1.addEventListener('click', async (e) => {
  e.preventDefault();

  const city = cityInput.value.trim();

  if (city === '') {
    alert('Please enter a city name.');
    return;
  }

  wResult.innerHTML = 'Loading...';

  // Fetch wheather api data
  const APi_url2 = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}`;

  let wResponse = await fetch(APi_url2);
  console.log(wResponse);

  if (!wResponse.ok) {
    wResult.innerHTML = `Error fetching location (code: ${wResponse.status})`;
    return;
  }

  let wData = await wResponse.json();
  console.log(wData);

  if (!wData.results || wData.results.length === 0) {
    wResult.innerHTML = 'City not found.';
    return;
  }

  const { latitude, longitude, name, country } = wData.results[0];
  /* expand method -
  const cityData = wData.results[0];
  const latitude = cityData.latitude;
  const longitude = cityData.longitude;
  const name = cityData.name;
  const country = cityData.country;

*/
  console.log(wData.results);

  // Fetch weather data including hourly precipitation probability
  const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=precipitation_probability&timezone=auto`;

  let weatherResponse = await fetch(weatherUrl);
  console.log(weatherResponse);
  if (!weatherResponse.ok) {
    wResult.innerHTML = `Error fetching weather (code: ${weatherResponse.status})`;
    return;
  }

  let weatherData = await weatherResponse.json();
  console.log(weatherData);
  const current = weatherData.current_weather;

  // Get current time in ISO format (aligned to the API timezone)
  const currentTime = current.time;

  // Find the index of the current time in hourly time array
  const timeIndex = weatherData.hourly.time.indexOf(currentTime);

  // Get precipitation probability at current time if available
  let rainProb = 'N/A';
  if (timeIndex !== -1) {
    rainProb = weatherData.hourly.precipitation_probability[timeIndex];
  }

  const weatherCode = current.weathercode;
  const weatherDesc = weatherDescriptions[weatherCode] || "Unknown";

  wResult.innerHTML = `
    <h2>Weather in ${name}, ${country}</h2>
    <p>Temperature: ${current.temperature} °C</p>
    <p>Wind Speed: ${current.windspeed} km/h</p>
    <p>Weather Code: ${weatherCode} — ${weatherDesc}</p>
    <p>Rain Probability: ${rainProb}%</p>

  `;
});
