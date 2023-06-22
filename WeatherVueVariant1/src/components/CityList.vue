<template>
  <div class="city-list">
    <label for="city">
      Выберите город:
    </label>
    <select
      id="city"
      v-model="selectedCity"
      class="form-control"
    >
      <option
        v-for="city in cities"
        :value="city.name"
      >
        {{ city.name }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const cities = ref([
  { name: "Киев" },
  { name: "Харьков" },
  { name: "Одесса" },
  { name: "Днепр" },
  { name: "Донецк" },
  { name: "Запорожье" },
  { name: "Львов" },
  { name: "Кривой Рог" },
  { name: "Николаев" },
  { name: "Мариуполь" },
  { name: "Винница" },
  { name: "Херсон" },
  { name: "Полтава" },
  { name: "Чернигов" },
  { name: "Черкассы" },
  { name: "Житомир" },
]);

const selectedCity = ref("");

const emit = defineEmits({
  select(payload) {
    if (payload !== undefined) {
      return true;
    }
  }
})

watch(() => selectedCity.value, () => {
  const city = this.cities.find((item) => item.name === this.selectedCity);
  emit("select", city);
});
</script>

<style scoped>
h1 {
  font-size: 24px;
}

ul {
  list-style-type: none;
  padding-left: 0;
}

li {
  margin-bottom: 5px;
}
</style>
