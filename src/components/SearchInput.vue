<template>
    <input v-model="searchQuery" type="input" class="custom-input" placeholder="Поиск..." name="name" id="name" />
</template>
<script>
import { mapMutations } from "vuex";
export default {
    data() {
        return {
            searchQuery: "",
            debounce: null,
        };
    },
    methods: {
        ...mapMutations(["setSearchQuery"]),
    },
    watch: {
        searchQuery(newValue) {
            clearTimeout(this.debounce);
            this.debounce = setTimeout(() => {
                this.setSearchQuery(newValue);
            }, 300);
        },
    },
};
</script>
<style scoped lang="scss">
.custom-input {
    padding: 8px 10px;
    border: 1px solid teal;
    width: 100%;
}
.custom-input:focus {
    border: 1px solid teal;
}
.custom-input:focus-visible {
    outline: none;
}
</style>
