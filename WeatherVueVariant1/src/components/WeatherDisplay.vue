<script setup>
import { ref, watch, onMounted } from 'vue';
import { getWeatherForWeek } from '@/services/WeatherService';
import { getWeatherDescription } from '@/services/WeatherService';
import { getTemperatureString } from '@/services/WeatherService';
import { getWeatherForDay } from '@/services/WeatherService';
import { groupWeatherByDay } from '@/services/WeatherService';

const props = defineProps({
  selectedCity: String,
  cityList: Array
})
const temperature = ref('');
const description = ref('');
const humidity = ref('');
const windSpeed = ref('');
const weatherLoaded = ref(false);
const weeklyWeather = ref([]);
const groupedWeather = ref({});

function showWeather() {
  getWeather();
  getWeeklyWeather();
}

function getWeather() {
  try {
    getWeatherForDay(props.selectedCity).then((data) => {
      const weatherData = data;
      if (weatherData && weatherData.main) {
        temperature.value = weatherData.main.temp;
        description.value = weatherData.weather[0].description;
        humidity.value = weatherData.main.humidity;
        windSpeed.value = weatherData.wind.speed;
        weatherLoaded.value = true;
      }
    });
  } catch (error) {
    console.log($t('fetchError'), error);
  }
}


function getWeeklyWeather() {
  try {
    getWeatherForWeek(props.selectedCity).then((data) => {
      const weeklyWeatherData = data;
      if (weeklyWeatherData && weeklyWeatherData.list) {
        weeklyWeather.value = weeklyWeatherData.list.map((forecast) => ({
          date: forecast.dt_txt.split(' ')[0],
          time: forecast.dt_txt.split(' ')[1],
          temperature: forecast.main.temp,
          description: forecast.weather[0].description,
        }));

        groupedWeather.value = groupWeatherByDay(weeklyWeather.value);
      }
    });
  } catch (error) {
    console.log($t('fetchError'), error);
  }
}

onMounted(showWeather);

const selectedCity = ref(props.selectedCity);
watch(selectedCity, (_old, _new) => {
  showWeather();
  console.log('watch');
});
</script>

<template>
  <div class="container">
    <h1>{{ $t('weather') }}</h1>
    <div
      v-if="weatherLoaded"
      class="current-weather"
    >
      <div class="city-info">
        <h2>
          {{ selectedCity }}
        </h2>
      </div>
      <div class="weather-info">
        <p class="temperature">
          {{ $t('temp') }} {{ temperature }}°C
        </p>
        <p class="description">
          {{ $t('description') }} {{ description }}
        </p>
        <p class="extra-info">
          {{ $t('humidity') }} {{ humidity }}%, {{ $t('windSpeed') }} {{ windSpeed }} м/с
        </p>
      </div>
    </div>
    <div v-if="groupedWeather && Object.keys(groupedWeather).length">
      <h3>{{ $t('weekWeather') }}</h3>
      <div class="weather-table">
        <div class="weather-row header">
          <div class="weather-cell">
            {{ $t('date') }}
          </div>
          <div class="weather-cell">
            {{ $t('tempDayNight') }}
          </div>
          <div class="weather-cell">
            {{ $t('description') }}
          </div>
        </div>
        <div
          v-for="(weatherGroup, day) in groupedWeather"
          :key="day"
          class="weather-row"
        >
          <div class="weather-cell">
            {{ day }}
          </div>
          <div class="weather-cell">
            {{ getTemperatureString(weatherGroup) }}
          </div>
          <div class="weather-cell">
            {{ getWeatherDescription(weatherGroup) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css');
@import url('@/css/CurrentWeather.css');
@import url('@/css/WeatherWeek.css');
</style>
