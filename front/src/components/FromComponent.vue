<template>
    <div class="from">
        <p class="from-title">
            Lieu de départ
        </p>
        <v-text-field :items="[]" variant="underlined" class="from-search" id="from-search" :value="searchTextFrom"
            @input="updateSearchTextFrom" @change="handleSearch"></v-text-field>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "FromComponent",
    data() {
        return {
            searchTextFrom: ''
        };
    },
    methods: {
        handleSearch() {
            this.$store.commit('setSearchTextFrom', this.searchTextFrom);
        },
        updateSearchTextFrom(event) {
            const newValue = event.target.value;
            this.$store.commit("setSearchTextFrom", newValue);
        },
    },
    mounted() {
        // Listen if searchTextFrom is updated in store
        this.$store.subscribe((mutation, state) => {
            if (mutation.type === 'setSearchTextFrom') {
                this.searchTextFrom = state.searchTextFrom;
            }
        });
    },
    computed: {
        // ...mapState({
        //     searchTextFrom: state => state.searchTextFrom,
        // }),
    },
}
</script>

<style scoped>
.from {
    margin-top: 20px;
    margin-left: 20px;
    width: 40vw;
}

.from-title {
    font-weight: 500;
}
</style>
