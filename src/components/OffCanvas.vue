<template>
    <transition name="slide-fade">
        <div class="off-canvas" v-if="stationData">
            <div class="content-wrapper">
                <div @click="closeOffCanvas" class="close">
                    <img src="assets/close.svg" alt="" />
                </div>
                <h3>{{ stationData.name }}</h3>
                <p>{{ stationData.district }}</p>
                <p>{{ stationData.admArea }}</p>
            </div>
        </div>
    </transition>
</template>
<script>
import { mapMutations } from "vuex";

export default {
    props: {
        stationData: {
            type: Object,
            require: true,
        },
    },
    methods: {
        ...mapMutations(["setActiveStation"]),
        closeOffCanvas() {
            this.setActiveStation(null);
        },
    },
};
</script>
<style>
.off-canvas {
    height: 100%;
    position: fixed;
    z-index: 123;
    top: 0;
    right: 0;
    background-color: #f2f2f2; /* Black*/
    overflow-x: hidden;
}
.content-wrapper {
    position: relative;
    padding: 20px 40px;
}
.close {
    position: absolute;
    right: 0;
    border-left: 1px solid black;
    border-bottom: 1px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    padding: 5px;
    top: 0;
}
.slide-fade-enter-active {
    transition: all 0.5s ease;
}
.slide-fade-leave-active {
    transition: all 0.5s ease;
}
.slide-fade-enter,
.slide-fade-leave-to {
    transform: translateX(10px);
    opacity: 0;
}
</style>
