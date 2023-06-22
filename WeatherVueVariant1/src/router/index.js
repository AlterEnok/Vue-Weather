import { createRouter, createWebHistory } from "vue-router";
import WeatherDisplay from "@/components/WeatherDisplay.vue";

const routes = [
  {
    path: "/",
    name: "weatherDisplay",
    component: WeatherDisplay,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
