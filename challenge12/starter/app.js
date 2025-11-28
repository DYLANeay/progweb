'use strict';

// getCoordinates()
// Demande au navigateur de détecter la position actuelle de l'utilisateur et retourne une Promise
const getCoordinates = () => {
	return new Promise((res, rej) =>
		navigator.geolocation.getCurrentPosition(res, rej)
	);
};

// getPosition()
// Résout la promesse de getCoordinates et retourne un objet {lat: x, long: y}
const getPosition = async () => {
	const position = await getCoordinates();
	return {
		lat: position.coords.latitude,
		long: position.coords.longitude,
	};
};

// renderWeather(min, max)
// Affiche la valeu des deux paramêtres dans le widget de météo
const renderWeather = (min, max) => {
	document.querySelector('.min').textContent = `${min}°C`;
	document.querySelector('.max').textContent = `${max}°C`;
	return;
};

// parseStationData(rawData, stationName)
// Reçoit la réponse JSON de l'API Transport/stationboard et recrache un objet
// ne contenant que les informations pertinentes.
const parseStationData = (rawData, stationName) => {
	if (!rawData.stationboard) {
		throw new Error('Station introuvable');
	}
	const { stationboard } = rawData;
	const departures = stationboard.map((el) => {
		const date = new Date(el.stop.departure);
		const hours = date.getHours();
		const minutes = date.getMinutes();
		const formattedHours = date.getHours() < 10 ? '0' + hours : hours;
		const formattedMinutes = date.getMinutes() < 10 ? '0' + minutes : minutes;
		return {
			departure: `${formattedHours}:${formattedMinutes}`,
			destination: el.to,
			category: el.category,
		};
	});

	return {
		station: stationName,
		departures,
	};
};

// renderTrain(train)
// Affiche une ligne de départ dans le widget CFF.
const renderTrain = (train) => {
	const board = document.querySelector('.departures');
	const html = `
    <article>
        <div class="time">${train.departure}</div>
        <div class="category" data-category="${train.category}">${train.category}</div>
        <div class="destination">${train.destination}</div>
    </article>
    `;
	board.insertAdjacentHTML('beforeend', html);
	return;
};

// renderStationName(station)
// Affiche le mot passé en paramettre dans le widget CFF.
const renderStationName = (station) => {
	const stationElement = document.querySelector('.departures header p');
	stationElement.textContent = station;
};

// Votre code peut se trouver dans cette fonction. L'appel vers getPosition est
// déjà implémenté. Si vous jetez un coup d'oeil à votre console vous verrez un objet
// contenant votre position.
const getDashboardInformation = async () => {
	try {
		const { lat, long } = await getPosition();
		try {
			const weatherData = await fetchWeatherData(lat, long);
			renderWeather(
				weatherData.daily.apparent_temperature_min[0],
				weatherData.daily.apparent_temperature_max[0]
			);
		} catch (error) {
			console.error('Erreur lors du chargement de la météo:', error);
		}

		try {
			const trainData = await fetchTrainData(lat, long);
			console.log(trainData);
			renderStationName(trainData.station);
			trainData.departures.forEach((train) => {
				renderTrain(train);
			});
		} catch (error) {
			console.error('Erreur lors du chargement des données CFF:', error);
		}
	} catch (error) {
		// Geolocation error
		console.error('Impossible de détecter votre position:', error);
	}
};

const fetchWeatherData = async (lat, long) => {
	const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&daily=apparent_temperature_max,apparent_temperature_min&timezone=auto&forecast_days=1`;
	const response = await fetch(url);
	const data = await response.json();
	return data;
};

const fetchTrainData = async (lat, long) => {
	const locationsUrl = `https://transport.opendata.ch/v1/locations?x=${lat}&y=${long}`;
	const locationsResponse = await fetch(locationsUrl);
	const locationsData = await locationsResponse.json();

	if (!locationsData.stations || locationsData.stations.length === 0) {
		throw new Error('Aucune gare trouvée à proximité');
	}

	// Filter to only get train stations (not bus or tram stops)
	const trainStations = locationsData.stations.filter(
		(station) => station.icon === 'train'
	);

	if (trainStations.length === 0) {
		throw new Error('No train stations nearby');
	}

	console.log(locationsData);
	const nearestStation = trainStations[0];
	if (!nearestStation.name) {
		throw new Error('Nom de la gare introuvable');
	}

	const stationboardUrl = `https://transport.opendata.ch/v1/stationboard?station=${nearestStation.name}&limit=5`;
	const stationboardResponse = await fetch(stationboardUrl);
	const stationboardData = await stationboardResponse.json();

	return parseStationData(stationboardData, nearestStation.name);
};

getDashboardInformation();
