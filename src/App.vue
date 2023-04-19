<template>
    <div id="app">
        <map-box />
        <list-stations />
    </div>
</template>
<script>
import MapBox from "@/components/map/MapBox.vue";
import ListStations from "./components/ListStations.vue";

export default {
    components: {
        ListStations,
        MapBox,
    },
    created() {
        this.$store.dispatch("getStations");
    },
};
</script>
