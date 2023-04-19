import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        count: 0,
        stations: null,
        points: null,
        map: null,
    },
    mutations: {
        // renderData() {
        //     this.map.addSource("stations", {
        //         type: "geojson",
        //         data: points,
        //     });
        //     map.addLayer({
        //         id: "stations",
        //         type: "circle",
        //         source: "stations",
        //         paint: {
        //             "circle-color": `#fff`,
        //             "circle-radius": 8,
        //         },
        //     });
        // },
    },
    getters: {
        filledPoints(state) {
            return {
                type: "FeatureCollection",
                features: state.stations.map((station) => ({
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
