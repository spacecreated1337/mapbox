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
            console.log(this.$store.getters.filledPoints);
            this.map.addSource("stations", {
                type: "geojson",
                data: this.$store.getters.filledPoints,
            });
            this.map.addLayer({
                id: "stations",
                type: "circle",
                source: "stations",
                paint: {
                    "circle-radius": 5,
                    "circle-color": [
                        "case",
                        ["boolean", ["feature-state", "color"], false],
                        ["feature-state", "color"],
                        "#000000",
                    ],
                },
            });
            this.$store.getters.filledPoints.features.forEach((feature) => {
                this.map.setFeatureState(
                    { source: "stations", id: feature.properties.id },
                    { color: feature.properties["marker-color"] }
                );
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
