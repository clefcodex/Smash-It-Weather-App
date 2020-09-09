// SELECT ELEMENTS
const dateDisplay = document.querySelector(".display_date");
const submitBtn = document.querySelector("#submitBtn");
const icon = document.querySelector(".icon img");
const tempValue = document.querySelector(".tempValue");
const description = document.querySelector(".description");
const cityDisplay = document.querySelector(".cityDisplay");


let city;
const key = "5573ba8ed632e20049794b7e65e73e57";
let storedSearch;



// Working with Time and date
function displayDate() {
	let date = new Date();
	const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

	dateFormat = `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
	dateDisplay.textContent = dateFormat;	
}


async function getWeather(location='New York') {
	let api_url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${key}`; 
	const response = await fetch(api_url);
	const data = await response.json();
	const temp = Math.round(data.main.temp - 273);
	tempValue.innerHTML = `${temp}&deg;C`;
	cityDisplay.textContent = `${data.name}, ${data.sys.country}`;
	description.textContent = data.weather[0].description;
	icon.src = `icons/${data.weather[0].icon}.png`;
	displayDate();
}



// get weather from last search if available
if(localStorage.length === 1){
	storedSearch = localStorage.getItem('search');
	getWeather(storedSearch);
} else {
	getWeather();
}



submitBtn.addEventListener('click', () => {
	city = document.querySelector('#inputText').value;
	localStorage.setItem('search', city);
	getWeather(city);
});

