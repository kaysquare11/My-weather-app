// my api key from the open-wather-map 
const apiKey = "54fbdf86b2ee54c4efcb38f3aa135339";

document.getElementById("getWeatherBtn").addEventListener("click", async () => {
    const city = document.getElementById("cityInput").value;
    const weatherInfo = document.getElementById("weatherInfo");

    if (!city) {
        weatherInfo.innerHTML = "Please enter a city name.";
        return;
    }

    //   weatherInfo.innerHTML = "Loading...";

    weatherInfo.innerHTML = '<div class="loader"></div>';



    try {
        const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );

        if (!res.ok) {
            throw new Error("City not found");
        }

        const data = await res.json();

        const { name, sys, main, weather } = data;


        const now = new Date();
        const dateString = now.toLocaleDateString();
        const timeString = now.toLocaleTimeString();


        weatherInfo.innerHTML = `
      <p><strong>${name}, ${sys.country}</strong></p>
      <p>${weather[0].main} - ${weather[0].description}</p>
      <p>🌡️ Temp: ${main.temp}°C</p>
      <p>Humidity: ${main.humidity}%</p>
      <p>📅 Date: ${dateString}</p>
      <p>⏰ Time: ${timeString}</p>
    `;
    } catch (error) {
        weatherInfo.innerHTML = error.message;
    }
});



