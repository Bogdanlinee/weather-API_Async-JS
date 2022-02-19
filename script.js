function cityList() {
	const cities = {
		703448: "Kyiv",
		3099434: "Gdansk",
		5115985: "East New York",
		5106292: "West New York",
		6167865: "Toronto",
		2988507: "Paris",
	}

	let newSelect = document.createElement('select');
	newSelect.setAttribute('class', 'createSelect');
	document.querySelector('.widget').appendChild(newSelect);

	document.querySelector('.out').parentNode.insertBefore(newSelect, document.querySelector('.out'));

	for (let key in cities) {
		let a = document.createElement('option');
		a.setAttribute('value', key);
		a.textContent = cities[key];
		newSelect.appendChild(a);
	}
}
cityList();

function getWeather() {
	const cityId = document.querySelector('.createSelect').value;
	const resource = 'https://api.openweathermap.org/data/2.5/weather?';
	const apiKey = 'appid=48db031d16dd92141acdde9d759e0bab';

	fetch(`${resource}id=${cityId}&${apiKey}`)
		.then(function responseWeather(resp) {
			return resp.json()
		})
		.then(function showWeather(data) {
			console.log(data);
			document.querySelector('.out__temp').innerHTML =
				`Температура воздуха: ${Math.round(data.main.temp - 270)}&deg`;

			document.querySelector('.out__wind').innerHTML =
				`Скорость ветра: ${Math.round(data.wind.speed)} м/с`;

			document.querySelector('.out__humidity').innerHTML =
				`Влажность: ${data.main.humidity}%`;

			document.querySelector('.out__pressure').innerHTML =
				`Давление: ${Math.round(data.main.pressure / 1.333)} мм рт. ст`;
			document.querySelector('.out__city').innerHTML =
				`Город: ${data.name}`
		})
}
getWeather();
document.querySelector('.createSelect').onchange = getWeather;