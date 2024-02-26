const apiKey = '035f9b69388be5acdee5b173378a1285'; // Replace with your OpenWeatherMap API key
const baseUrl = 'https://openweathermap.org/api';

document.getElementById('search-box').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        const city = event.target.value;
        getWeather(city);
    }
});

function getWeather(city) {
    const url = `${baseUrl}?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
        displayWeather(data);
    })
    .catch(error => {
        console.error('Error fetching weather data:', error);
    });
}

function displayWeather(data) {
    const { name } = data;
    const { country } = data.sys;
    const { temp, temp_min, temp_max } = data.main;
    const { description } = data.weather[0];

    const date = new Date().toDateString(); // Format the date as needed

    document.getElementById('city-name').textContent = `${name}, ${country}`;
    document.getElementById('weather-date').textContent = date;
    document.getElementById('temperature').textContent = `${Math.round(temp)}°C`;
    document.getElementById('weather-conditions').textContent = description.charAt(0).toUpperCase() + description.slice(1);
    document.getElementById('temperature-range').textContent = `${Math.round(temp_min)}°C / ${Math.round(temp_max)}°C`;
}
