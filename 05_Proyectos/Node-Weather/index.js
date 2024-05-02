import axios from "axios";
import chalk from "chalk";

const API_KEY = "c94d90d6136884fdc3dc0d036e3599d3";

function displayWeather(city, weatherData) {
	console.log(
		chalk.red(`\n***************************************************`)
	);
	console.log(chalk.yellow.bold(`Información del clima de ${city}`));
	console.log(chalk.red("***************************************************"));
	console.log(chalk.blue(`Descripción: ${weatherData.weather[0].description}`));
	console.log(chalk.blue(`Temperatura: ${weatherData.main.temp} °C`));
	console.log(chalk.blue(`Humedad: ${weatherData.main.humidity}%`));
	console.log(
		chalk.blue(`Velocidad del vento: ${weatherData.wind.speed * 100} km/h`)
	);
	console.log(chalk.red("***************************************************"));
}

function handlerError(error) {
	console.log(chalk.red("Error: " + error.message));
	process.exit(1);
}

async function getWeather(city) {
	try {
		let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
		const res = await axios.get(apiUrl, {
			params: {
				q: city,
				appid: API_KEY,
				units: "metric",
			},
		});
		return res.data;
	} catch (error) {
		console.log(chalk.red(error));
		throw new Error(`No se pudo obtener la información de ${city}`);
	}
}

function startApp() {
	let city = process.argv[2];

	if (!city) {
		console.log(chalk.red("Ingresa un nombre de ciudad..."));
		console.log(chalk.red("Ingresa en la consola: node index.js [ciudad"));
	}

	getWeather(city)
		.then((weatherData) => displayWeather(city, weatherData))
		.catch(handlerError);
}

startApp();
