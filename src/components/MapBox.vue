<template>
    <div id="map" style="width: 100%; height: 100%"></div>
</template>
<script>
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import { mapMutations } from "vuex";
export default {
    props: {
        coordinatesToFly: {
            type: Array,
            required: false,
        },
    },
    mounted() {
        this.initMap();
        this.addEventHandlePoints();
    },
    data() {
        return {
            map: null,
            ACCESS_TOKEN: "pk.eyJ1IjoicXV2YWtpIiwiYSI6ImNsZ2ozdTFrNDBjdmkzbnB6NzZueDV5NTYifQ.rM1LSJG_BGZtn3x_mWS0cA",
        };
    },
    methods: {
        ...mapMutations(["setActiveStation"]),
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

            this.map.on("mouseenter", "stations", () => {
                this.map.getCanvas().style.cursor = "pointer";
            });
            this.map.on("mouseleave", "stations", () => {
                this.map.getCanvas().style.cursor = "";
            });
        },
        renderDataLines() {
            this.map.addSource("lines", {
                type: "geojson",
                data: this.$store.getters.filledLines,
            });
            this.map.addLayer({
                id: "lines",
                type: "line",
                source: "lines",
                layout: {
                    "line-join": "round",
                    "line-cap": "round",
                },
                paint: {
                    "line-color": ["get", "line-color"],
                    "line-width": 4,
                    "line-opacity": 1,
                },
            });
        },
        addEventHandlePoints() {
            this.map.on("click", "stations", (e) => {
                this.setActiveStation(null);
                this.$nextTick().then(() => {
                    const stationProperty = this.map.queryRenderedFeatures(e.point)[0].properties;
                    this.setActiveStation(stationProperty);
                });
            });
        },
    },
    watch: {
        "$store.state.map.searchQuery"(newValue) {
            this.map.getSource("stations").setData(this.$store.getters.filledPoints);
            if (newValue === "") {
                this.map.setPaintProperty("lines", "line-opacity", 1);
                return;
            }
            this.map.setPaintProperty("lines", "line-opacity", 0.3);
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
