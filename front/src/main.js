import { createApp } from 'vue'
import App from './App.vue'
import 'v-calendar/dist/style.css';
// Vuetify
import 'vuetify/styles'
import {createVuetify} from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import router from './router/index.js';


import VCalendar from 'v-calendar';
import Vuex from 'vuex'

const vuetify = createVuetify({
    components,
    directives,
})

const store = new Vuex.Store({
    state: {
        map : null,
        searchTextFrom: '',
        searchTextTo: '',
        categories: [
            {name: "Hotels", results: [],markers : [],  visible: false},
            {name: "Restaurants", results: [],markers : [], visible: false},
            {name: "Bars", results: [], markers : [], visible: false},
            {name: "Activités", results: [], markers : [],icons : [], visible: false},
        ],
        selectedActivities: {
            "Hotels": null,
            "Restaurants": null,
            "Bars": null,
            "Activités": null
        },
        selectedDates: {
            start: null,
            end: null
        }
    },
    mutations: {
        setSearchTextFrom(state, searchTextFrom) {
            state.searchTextFrom = searchTextFrom
        },
        setSearchTextTo(state, searchTextTo) {
            state.searchTextTo = searchTextTo
        },
        setMap(state, mapProp) {
            state.map = new google.maps.Map(document.getElementById("map"), mapProp);

        },
        // Ajoutez une mutation pour modifier la visibilité d'une catégorie
        setCategoryVisibility(state, {categoryIndex, visible}) {
            state.categories[categoryIndex].visible = visible
        },
        // Ajoutez une mutation pour ajouter des résultats à une catégorie
        addResultsToCategory(state, {categoryIndex, results}) {
            state.categories[categoryIndex].results = results
        },
        // Ajoutez une mutation pour ajouter des marqueurs à une catégorie
        addMarkersToCategory(state, { categoryIndex, markers }) {
            state.categories[categoryIndex].markers = markers
        },

        clearMarkers(state) {
            for (let i = 0; i < state.categories.length; i++) {
                for (let j = 0; j < state.categories[i].markers.length; j++) {
                    state.categories[i].markers[j].markers.setMap(null);
                }
            }

        },
        markerIsVisible(state, {category, visible}) {
            if (!visible) {
                for (let i = 0; i < category.markers.length; i++) {
                    category.markers[i].markers.setVisible(false)
                }
            } else {
                for (let i = 0; i < category.markers.length; i++) {
                    category.markers[i].markers.setVisible(true)
                }
            }
        },
        setActivity(state, { category, activityData }) {
            state.selectedActivities[category] = activityData
        },
        setDates(state, { start, end }) {
            state.selectedDates.start = start
            state.selectedDates.end = end
        }
    },
    actions: {},
    getters: {
        allMarkers(state) {
            const markers = []
            state.categories.forEach(category => {
                if (category.visible) {
                    markers.push(...category.markers)
                }
            })
            return markers
        },
        getCategoryIsVisible: (state) => (index) => {
            return state.categories[index].visible;
        },
        getCategoriesMarker: (state) => (index) => {
            return state.categories[index].markers;
        },
        getCategoriesMarkerLength: (state) => (index) => {
            return state.categories[index].markers.length;
        },
        c: (state) => () => {
            let total = 0;
            console.log(state.categories);
            for (const category of state.categories) {
                console.log(category);
                total += category.markers.length
            }
            return total
        },
        getSearchTextFrom(state) {
            return state.searchTextFrom
        },
        getSearchTextTo(state) {
            return state.searchTextTo
        },
        getActivities(state) {
            return state.selectedActivities
        },
        getDates(state) {
            return state.selectedDates
        }
    }
})

export default store



createApp(App).use(vuetify).use(VCalendar).use(store).use(router).mount('#app')