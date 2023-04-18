<template>
    <div id="app">
        <map-box />
        <div class="sidebar">
            <div class="heading">
                <h1>Станции метро</h1>
            </div>
            <div id="listings" class="listings"></div>
        </div>
    </div>
</template>
<script>
import MapBox from "@/components/map/MapBox.vue";

export default {
    components: {
        MapBox,
    },
};
</script>
<style>
.sidebar {
    position: absolute;
    width: 550px;
    height: 50%;
    top: 50%;
    left: -10%;
    transform: translate(50%, -50%);
    overflow: hidden;
    border-right: 1px solid rgba(0, 0, 0, 0.25);
}

.link-wrapper {
    display: flex;
}

.circle {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    margin-right: 10px;
}

.heading {
    background: #fff;
    border-bottom: 1px solid #eee;
    line-height: 50px;
    padding: 0 10px;
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
    width: 3px;
    height: 3px;
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
