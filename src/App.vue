<template>
    <div id="app">
        <map-box :coordinatesToFly="coordinatesToFly" />
        <list-stations @open-station-popup="openPopup" @get-coordinates="getCoordinates" />
        <off-canvas v-if="$store.state.activeId !== null" :stationData="$store.getters.getStationByIdAndCoords" />
    </div>
</template>
<script>
import MapBox from "@/components/MapBox.vue";
import ListStations from "@/components/ListStations.vue";
import OffCanvas from "@/components/OffCanvas.vue";
export default {
    components: {
        ListStations,
        MapBox,
        OffCanvas,
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
