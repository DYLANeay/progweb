'use strict';

const section = document.querySelector('section#board');

const URL_API =
	'https://transport.opendata.ch/v1/stationboard?station=Yverdon-les-bains&limit=10';
const req = new XMLHttpRequest();
req.open('GET', URL_API);
req.send();

req.addEventListener('load', (e) => {
	const data = JSON.parse(e.target.responseText);
	const stationboard = [];

	console.log(data.stationboard);
	for (let i = 0; i < data.stationboard.length; i++) {
		let departureTime = data.stationboard[i].stop.departure;
		let formattedTime = departureTime.slice(11, 16);

		stationboard.push({
			time: formattedTime,
			category: data.stationboard[i].category,
			to: data.stationboard[i].to,
		});
	}

	displayStationboard(stationboard);
});

const displayStationboard = (arr) => {
	section.innerHTML = '';

	arr.forEach((item) => {
		const article = document.createElement('article');
		const timeDiv = document.createElement('div');
		timeDiv.classList.add('time');
		timeDiv.textContent = item.time;

		const categoryDiv = document.createElement('div');
		categoryDiv.classList.add('category');
		categoryDiv.setAttribute('data-category', item.category);
		categoryDiv.textContent = item.category;

		const destinationDiv = document.createElement('div');
		destinationDiv.classList.add('destination');
		destinationDiv.textContent = item.to;

		article.appendChild(timeDiv);
		article.appendChild(categoryDiv);
		article.appendChild(destinationDiv);

		section.appendChild(article);
	});
};
