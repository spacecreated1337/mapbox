export default {
    state: () => ({
        stations: null,
        metroBranches: null,
        searchQuery: "",
        activeStation: null,
    }),
    getters: {
        filledPoints(state, getters) {
            return {
                type: "FeatureCollection",
                features: getters.searchedStations.map((station) => ({
                    type: "Feature",
                    properties: {
                        id: station.id,
                        name: station.name,
                        "marker-color": `#${station.hex_color}`,
                        lng: station.lng,
                        lat: station.lat,
                    },
                    geometry: {
                        type: "Point",
                        coordinates: [station.lng, station.lat],
                    },
                })),
            };
        },
        filledLines(state) {
            const lines = state.metroBranches.map((branch) => ({
                type: "Feature",
                properties: {
                    "line-color": `#${branch.hex_color}`,
                },
                geometry: {
                    type: "LineString",
                    coordinates: branch.stations.map((station) => [station.lng, station.lat]),
                },
            }));

            return {
                type: "FeatureCollection",
                features: lines,
            };
        },
        searchedStations(state) {
            if (state.stations) {
                return state.stations.filter((station) =>
                    station.name.toLowerCase().includes(state.searchQuery.toLowerCase())
                );
            }
        },
        getStationByIdAndCoords(state) {
            if (state.stations && state.activeStation !== null) {
                return state.stations.find((station) => {
                    if (station.id === state.activeStation.id && station.name === state.activeStation.name) {
                        return station;
                    }
                });
            }
        },
    },
    actions: {
        async getStations({ state }) {
            state.stations = await fetch("assets/metro.msk.json")
                .then((data) => data.json())
                .then((metro) => {
                    state.metroBranches = metro;
                    return metro
                        .map((stations) => {
                            return stations.stations.map((station, idx) => {
                                station.hex_color = stations.hex_color;
                                station.id = idx;
                                return station;
                            });
                        })
                        .flat();
                });
        },
    },
    mutations: {
        setSearchQuery(state, string) {
            state.searchQuery = string;
        },
        setActiveStation(state, station) {
            state.activeStation = station;
        },
    },
};
