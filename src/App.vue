<template>
    <div id="app">
        <map-box :coordinatesToFly="coordinatesToFly" />
        <list-stations @open-station-popup="openPopup" @get-coordinates="getCoordinates" />
    </div>
</template>
<script>
import MapBox from "@/components/MapBox.vue";
import ListStations from "@/components/ListStations.vue";
export default {
    components: {
        ListStations,
        MapBox,
    },
    data() {
        return {
            coordinatesToFly: null,
            stationData: null,
        };
    },
    created() {
        this.$store.dispatch("getStations");
    },
    methods: {
        getCoordinates(coordinates) {
            this.coordinatesToFly = coordinates;
        },
        openPopup(station) {
            this.stationData = station;
        },
    },
};
</script>
