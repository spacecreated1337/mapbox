<template>
    <div class="list-stations">
        <div class="heading">Станции метро</div>
        <div class="input-wrapper">
            <search-input />
        </div>
        <station-item
            :station="station"
            class="link-wrapper"
            :key="idx"
            v-for="(station, idx) in $store.getters.searchedStations"
            @get-coordinates="getCoordinates"
            :class="{ 'active-link': activeLinkStation === station }"
            @click.native="setActiveLinkAndShowModal(station)"
        />
    </div>
</template>

<script>
import SearchInput from "./SearchInput.vue";
import StationItem from "./StationItem.vue";
export default {
    components: {
        SearchInput,
        StationItem,
    },
    data() {
        return {
            activeLinkStation: null,
        };
    },
    methods: {
        getCoordinates(coordinates) {
            this.$emit("get-coordinates", coordinates);
        },
        setActiveLinkAndShowModal(station) {
            this.$emit("open-station-popup", station);
            if (this.activeLinkStation === station) {
                this.activeLinkStation = null;
                return;
            }
            this.activeLinkStation = station;
        },
    },
};
</script>
<style>
.input-wrapper {
    padding: 10px 20px;
}
.active-link {
    background: #f2f2f2;
}
.list-stations {
    position: absolute;
    height: 50%;
    top: 50%;
    left: 20%;
    transform: translate(-50%, -50%);
    overflow: auto;
    background: #fff;
    min-width: 300px;
}

.link-wrapper {
    display: flex;
    padding: 10px 0;
}

.heading {
    background: #fff;
    line-height: 50px;
    font-size: 20px;
    padding: 10px 20px;
}

.listings {
    height: 100%;
    overflow: auto;
    padding-bottom: 60px;
    background: #fff;
}

.listings .item {
    border-bottom: 1px solid #eee;
    padding: 10px;
    text-decoration: none;
}

.listings .item:last-child {
    border-bottom: none;
}

.listings .item .title {
    display: block;
    font-size: 18px;
}

.listings .item:has(.active) {
    background-color: #f8f8f8;
}

.listings .item .title small {
    font-weight: 400;
}

.listings .item.active {
    background-color: #f8f8f8;
}

::-webkit-scrollbar {
    width: 5px;
    height: 5px;
    border-left: 0;
    background: rgba(0, 0, 0, 0.1);
}

::-webkit-scrollbar-track {
    background: none;
}

::-webkit-scrollbar-thumb {
    background: palevioletred;
    border-radius: 0;
}
</style>
