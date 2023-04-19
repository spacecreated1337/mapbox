import Vue from "vue";
import App from "./App.vue";
import "./assets/base.css";
import "./assets/main.css";
import store from "../store/index";

new Vue({
    render: (h) => h(App),
    store,
}).$mount("#app");
