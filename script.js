"use strict";

const cityInput = document.getElementById("city");
const cityButton = document.getElementById("submitCity");

const cityOutput = document.getElementById("cityOutput");
const tempElem = document.getElementById("temperature");
const feelsLikeElem = document.getElementById("feelsLike");
const humidityElem = document.getElementById("humidity");
const pressureElem = document.getElementById("pressure");
const descriptionElem = document.getElementById("description");
const descriptionImg = document.getElementById("descriptionImg");
const windElem = document.getElementById("wind");

const separator = document.querySelector(".separator");
const imgBackground = document.querySelector(".imageContainer")
const noValue = document.querySelector(".noValue");

const API_KEY = "f8df2ca3f605188df0cb30fba4110897";

cityButton.addEventListener("click", () => {
	const city = cityInput.value;

	fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`)
	.then((response) => response.json())
	.then((data) => {
		const dataCity = data.name;
		const temp = Math.round(data.main.temp - 273);
		const feelsLike = Math.round(data.main.feels_like - 273);
		const humidity = data.main.humidity;
		const pressure = data.main.pressure / 10;
		const description = data.weather[0].description;
		const icon = data.weather[0].icon;
		
		const windSpeed = (data.wind.speed * 3.6).toFixed(1);
		
		cityOutput.innerHTML = dataCity;
		tempElem.innerHTML = `${temp}\u00B0C`;
		feelsLikeElem.innerHTML = `Feels like: ${feelsLike}\u00B0C`;
		humidityElem.innerHTML = `Humidity: ${humidity}`;
		pressureElem.innerHTML = `Pressure (kPa): ${pressure}`;
		descriptionElem.innerHTML = `Description: ${description}`;
		windElem.innerHTML = `Wind: ${windSpeed}km/h`;
		
		const imageSrc = `url(http://openweathermap.org/img/wn/${icon}@2x.png)`;
		descriptionImg.style = `background-image: ${imageSrc}`;
		descriptionImg.style.display = "block";

		if (icon.charAt(2) === "n") {
			imgBackground.style = "background-color: lightblue";
			document.body.stlye = "background: rgb(0,104,255)";
			document.body.style = "background: linear-gradient(0deg, rgba(0,104,255,1) 0%, rgba(9,9,121,1) 100%)";
		} else {
			imgBackground.style = "background-color: #0b0b45";
			document.body.style = "background: rgb(34,193,195)";
			document.body.style = "background: linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(45,154,253,1) 100%)";
		}

		separator.style.display = "block";
		descriptionElem.style.display = "block";
		imgBackground.style.display = "block";
		noValue.style.display = "none";
	})
	.catch((err) => alert("City not found"));
});
