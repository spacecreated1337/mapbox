import Vue from "vue";
import Vuex from "vuex";
import map from "./map";
Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        map,
    },
});

export default store;
