import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.scss'
import App from './App.vue'
import ClickOutsideDirective from "./directive/ClickOutsideDirective.ts";

const app = createApp(App);
app.use(createPinia())
app.directive('click-outside', ClickOutsideDirective);

app.mount('#app')
