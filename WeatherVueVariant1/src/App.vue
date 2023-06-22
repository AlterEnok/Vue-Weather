<template>
  <div
    id="app"
    :class="backgroundColorClass"
  >
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <a
          class="navbar-brand"
          href="#"
        >
          Weather App
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div
          class="collapse navbar-collapse"
          id="navbarNav"
        >
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <div class="d-flex">
                <input
                  type="text"
                  v-model="searchInput"
                  class="form-control"
                  placeholder="Введите город"
                >
                <button
                  class="btn btn-primary ml-2"
                  @click="searchWeather"
                >
                  {{ $t('search') }}
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <WeatherDisplay
      v-if="selectedCity !== ''"
      :key="selectedCity"
      :selected-city="selectedCity"
    />
  </div>
</template>

<script setup>
import WeatherDisplay from '@/components/WeatherDisplay.vue';
import { ref } from 'vue';

const backgroundColorClass = ref('my-custom-navbar');
const searchInput = ref('');
const selectedCity = ref('');

function searchWeather() {
  selectedCity.value = searchInput.value;
}
</script>

<style>
@import url('@/css/Base.css');
</style>
