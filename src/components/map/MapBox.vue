<template>
    <div id="map" style="width: 100%; height: 100%"></div>
</template>
<script>
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
export default {
    props: {
        coordinatesToFly: {
            type: Array,
            required: false,
        },
    },
    mounted() {
        this.initMap();
    },
    data() {
        return {
            map: null,
            ACCESS_TOKEN: "pk.eyJ1IjoicXV2YWtpIiwiYSI6ImNsZ2ozdTFrNDBjdmkzbnB6NzZueDV5NTYifQ.rM1LSJG_BGZtn3x_mWS0cA",
        };
    },
    methods: {
        initMap() {
            mapboxgl.accessToken = this.ACCESS_TOKEN;
            this.map = new mapboxgl.Map({
                container: "map",
                style: "mapbox://styles/mapbox/streets-v12",
                center: [37.617698, 55.755864],
                zoom: 11,
            });
            this.map.on("load", () => {
                this.renderDataLines();
                this.renderDataPoints();
            });
        },
        renderDataPoints() {
            this.map.addSource("stations", {
                type: "geojson",
                data: this.$store.getters.filledPoints,
            });
            this.map.addLayer({
                id: "stations",
                type: "circle",
                source: "stations",
                paint: {
                    "circle-radius": 8,
                    "circle-color": ["get", "marker-color"],
                },
            });

            this.map.on("click", "stations", (e) => {
                const coordinates = e.features[0].geometry.coordinates.slice();
                const description = e.features[0].properties.description;
                new mapboxgl.Popup({ closeOnClick: false }).setLngLat(coordinates).setHTML(description).addTo(this.map);
            });

            this.map.on("mouseenter", "stations", () => {
                this.map.getCanvas().style.cursor = "pointer";
            });
            this.map.on("mouseleave", "stations", () => {
                this.map.getCanvas().style.cursor = "";
            });
        },
        renderDataLines() {
            this.$store.state.map.metroBranches.map((branch) => {
                const coordinates = [];
                branch.stations.forEach((station) => {
                    coordinates.push([station.lng, station.lat]);
                });
                this.map.addSource(branch.name, {
                    type: "geojson",
                    data: {
                        type: "Feature",
                        properties: {
                            "lines-color": `#${branch.hex_color}`,
                        },
                        geometry: {
                            type: "LineString",
                            coordinates,
                        },
                    },
                });
                this.map.addLayer({
                    id: branch.name,
                    type: "line",
                    source: branch.name,
                    layout: {
                        "line-join": "round",
                        "line-cap": "round",
                    },
                    paint: {
                        "line-color": ["get", "lines-color"],
                        "line-width": 4,
                        "line-opacity": 1,
                    },
                });
            });
        },
    },
    watch: {
        "$store.state.map.searchQuery"(newValue) {
            this.map.getSource("stations").setData(this.$store.getters.filledPoints);
            this.$store.state.map.metroBranches.forEach((branch) => {
                if (newValue === "") {
                    this.map.setPaintProperty(branch.name, "line-opacity", 1);
                    return;
                }
                this.map.setPaintProperty(branch.name, "line-opacity", 0.3);
            });
        },
        coordinatesToFly() {
            this.map.flyTo({
                center: this.coordinatesToFly,
                zoom: 16,
            });
        },
    },
    beforeDestroy() {
        this.map = null;
    },
};
</script>
