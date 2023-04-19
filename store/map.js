export default {
    state: () => ({
        stations: null,
        metroBranches: null,
        searchQuery: "",
    }),
    getters: {
        filledPoints(state, getters) {
            return {
                type: "FeatureCollection",
                features: getters.searchedStations.map((station) => ({
                    type: "Feature",
                    properties: {
                        id: station.name,
                        title: station.name,
                        description: `
                            <p>${station.district}</p>
                            <p>${station.admArea}</p>
                            <p>${station.status}</p>
                        `,
                        "marker-color": `#${station.hex_color}`,
                    },
                    geometry: {
                        type: "Point",
                        coordinates: [station.lng, station.lat],
                    },
                })),
            };
        },
        searchedStations(state) {
            if (state.stations) {
                return state.stations.filter((station) =>
                    station.name.toLowerCase().includes(state.searchQuery.toLowerCase())
                );
            }
        },
    },
    actions: {
        async getStations({ state }) {
            state.stations = await fetch("../src/components/map/metro.msk.json")
                .then((data) => data.json())
                .then((metro) => {
                    state.metroBranches = metro;
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
    mutations: {
        setSearchQuery(state, string) {
            state.searchQuery = string;
        },
    },
};
