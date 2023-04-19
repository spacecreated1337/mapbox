<template>
    <div id="map" style="width: 100%; height: 100%"></div>
</template>
<script>
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
export default {
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
                // center: [37.617698, 55.755864],
                center: [37.617698, 55.755864],
                zoom: 11,
            });
            this.map.on("load", () => {
                this.renderData();
            });
        },
        renderData() {
            this.map.addSource("stations", {
                type: "geojson",
                data: this.$store.getters.filledPoints,
            });
            this.map.addLayer({
                id: "stations",
                type: "circle",
                source: "stations",
                paint: {
                    "circle-radius": 6,
                    "circle-color": ["get", "marker-color"],
                },
            });
        },
    },
};
</script>
<style>
.mapboxgl-popup-content {
    width: 250px;
}
.mapboxgl-marker {
    cursor: pointer;
}
</style>
