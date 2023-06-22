import { createI18n } from "vue-i18n";

export const i18n = createI18n({
  locale: "ru",
  messages: {
    ru: {
      weather: "Погода",
      temp: "Температура:",
      description: "Описание:",
      humidity: "Влажность:",
      windSpeed: "Порывы ветра:",
      weekWeather: "Погода на неделю:",
      date: "Дата:",
      tempDayNight: "Температура (день/ночь)",
      fetchError: "Error fetching weekly weather data:",
      search: "Поиск:",
    },
  },
});
