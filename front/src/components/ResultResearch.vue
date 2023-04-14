<template>
    <div class="result-container">
        <div class="result-title">
            <p>Résultats à : <b>{{ city }}, {{ country }}</b></p>
            <div class="result-number" :class="{ active: isActive }" @click="isActive = !isActive">
                {{ totalResults }}
            </div>
        </div>
        <v-sheet max-width="56vw" v-for="(category, index) in categories" :key="index" class="result-category">
            <div v-if="category.visible">
                {{ category.name }} recommandés dans la région
                <v-slide-group class="result-category-row" show-arrows="always">
                    <v-slide v-if="category.markers.length > 0" v-for="(result, index2) in category.markers" :key="index2"
                        class="result-category-div">
                        <result-div @click="changeMarkerColor(index, index2)" :title="result.info.name"
                            :address="result.info.address" :rating="result.info.rating.toLocaleString()" :photo="result.info.photo"
                            :location="{...result.info.location}" :index="index" :index2="index2" :markers="result" />
                    </v-slide>
                </v-slide-group>
            </div>
        </v-sheet>
    </div>
</template>

<script>
import ResultDiv from "@/components/ResultDiv.vue";
import { mapState } from "vuex";

export default {
    name: "ResultResearch",
    components: { ResultDiv },
    props: {
        city: String,
        country: String
    },
    computed: {
        ...mapState({
            categories: state => state.categories,
        }),
    },
    methods: {
        changeMarkerColor(index, index2) {
            for (let i = 0; i < this.categories.length; i++) {
                for (let j = 0; j < this.categories[i].markers.length; j++) {
                    this.categories[i].markers[j].markers.setVisible(false)
                }
            }

            this.categories[index].markers[index2].markers.setVisible(true)
        }
    },
    data() {
        return {
            isActive: false,
            totalResults: 0,
        };
    }
};
</script>

<style scoped>
.result-container {
    margin-top: 20px;
}

.result-title {
    display: flex;
    align-items: center;
    font-size: 22px;
}

.result-number {
    margin-left: 10px;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    width: 40px;
    height: 30px;
    background-color: #164465;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ffffff;
    border-radius: 5px;
    transition: background-color 0.2s, opacity 0.2s;
}

.result-category {
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    color: #949494;
    margin-top: 20px;
}

.result-category {
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    color: #949494;
    margin-top: 20px;
}

.result-category-row {
    display: flex;
    margin-top: 20px;
    flex-direction: row;
    width: 100%;
}

.v-slide-group__next,
.v-slide-group__prev {}

.v-slide-group__wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 0;
    padding: 0;
}

.v-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30vw;
    /* ajuster la largeur des diapositives en fonction de vos besoins */
    min-width: 30vw;
    /* spécifier une largeur minimale pour les diapositives */
    margin: 0;
    padding: 0;
    flex-shrink: 0;
}

.result-category-div {
    margin-right: 20px;
}
</style>