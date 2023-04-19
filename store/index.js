import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        stations: null,
        points: null,
    },
    getters: {
        filledPoints(state, getters) {
            return {
                type: "FeatureCollection",
                features: getters.searchedStations.map((station) => ({
                    type: "Feature",
                    properties: {
                        id: `${station.name}`,
                        description: `<strong>${station.name}</strong>
                        <p>${station.district}</p>
                        <p>${station.admArea}</p>
                        <p>${station.status}</p>
                        `,
                        "marker-size": "medium",
                        "marker-color": `#${station.hex_color}`,
                        "marker-symbol": "marker-green",
                    },
                    geometry: {
                        type: "Point",
                        coordinates: [station.lng, station.lat],
                    },
                })),
            };
        },
        searchedStations(state) {
            return state.stations.filter((station) => station.name.includes("Новокосино"));
        },
    },
    actions: {
        async getStations({ state }) {
            state.stations = await fetch("../src/components/map/metro.msk.json")
                .then((data) => data.json())
                .then((metro) => {
                    return metro
                        .map((stations) => {
                            return stations.stations.map((station) => {
                                station.hex_color = stations.hex_color;
                                return station;
                            });
                        })
                        .flat();
                });
        },
    },
});

export default store;
