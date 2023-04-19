<template>
    <div class="item-wrapper" @click="flyToPointCoordinates([station.lng, station.lat])">
        <div
            class="circle"
            :style="{
                background: `#${station.hex_color}`,
            }"
        ></div>
        <div
            :style="{
                color: `#${station.hex_color}`,
            }"
            class="station-title"
        >
            {{ station.name }}
        </div>
    </div>
</template>
<script>
export default {
    props: {
        station: {
            type: Object,
            required: true,
        },
    },
    methods: {
        flyToPointCoordinates(coordinates) {
            this.$emit("get-coordinates", coordinates);
        },
    },
};
</script>
<style scoped>
.circle {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    margin-right: 10px;
}
.station-title {
    font-size: 20px;
}
.item-wrapper {
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 10px 20px;
}
</style>
