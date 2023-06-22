import axios from "axios";

export async function getWeatherForWeek(selectedCity) {
  return new Promise((resolve, reject) => {
    axios({
      method: "GET",
      url: `${import.meta.env.VITE_OW_URL}forecast?q=${selectedCity}&units=metric&appid=${import.meta.env.VITE_OW_API_KEY}`,
    }).then((response) => {
      resolve(response.data);
    }).catch((error) => {
      reject(error.response.data);
    });
  });
}

export async function getWeatherForDay(selectedCity) {
  return new Promise((resolve, reject) => {
    axios({
      method: "GET",
      url: `${import.meta.env.VITE_OW_URL}weather?q=${selectedCity}&units=metric&appid=${import.meta.env.VITE_OW_API_KEY}`,
    }).then((response) => {
      resolve(response.data);
    }).catch((error) => {
      reject(error.response.data);
    });
  });
}

export function getWeatherDescription(weatherGroup) {
  const descriptions = weatherGroup.map((dayWeather) => dayWeather.description);
  const descriptionCount = {};

  for (let description of descriptions) {
    if (descriptionCount[description]) {
      descriptionCount[description]++;
    } else {
      descriptionCount[description] = 1;
    }
  }

  const mostCommonDescription = Object.keys(descriptionCount).reduce((a, b) =>
    descriptionCount[a] > descriptionCount[b] ? a : b
  );

  return mostCommonDescription;
}

export function getTemperatureString(weatherGroup) {
  const temperatures = weatherGroup.map((dayWeather) => dayWeather.temperature);
  return `${Math.min(...temperatures)}°C / ${Math.max(...temperatures)}°C`;
}

export function groupWeatherByDay(weekly) {
  const grouped = {};
  weekly.forEach((weather) => {
    const date = weather.date;
    const day = new Date(date).toLocaleDateString('en-US', { weekday: 'long' });
    if (!grouped[day]) {
      grouped[day] = [];
    }
    grouped[day].push(weather);
  });
  return grouped;
}
