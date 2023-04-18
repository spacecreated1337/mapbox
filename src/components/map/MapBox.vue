<template>
    <div id="map" style="width: 100%; height: 100%"></div>
</template>

<script>
import { initMap } from "./map";
export default {
    mounted() {
        initMap();
    },
    data() {
        return {};
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
