<template>
  <div class="search-container">
    <div class="search-wrapper">
      <div class="search">
        <div class="search-info">
          <img :src="SearchSVG" class="search-icon" alt="Search Icon"/>
          <v-text-field
              ref="searchInput"
              :items="[]"
              variant="underlined"
              :value="searchTextTo"
              id="search-search"
              @input="updateSearchTextTo"
          ></v-text-field>
          <div class="search-add">
            <DatePicker/>
          </div>
        </div>
        <v-btn
            class="validate-btn"
            @click="handleValidate"
        >
            Valider
        </v-btn>
      </div>
      <category :categories="categories"/>
      <result-research
          :city="city"
          :country="country"
          :total-results="totalResults"/>
    </div>
  </div>
</template>
<script>
import Filter from "@/components/Filter.vue";
import DatePicker from "@/components/DatePicker.vue";
import SearchSVG from "@/assets/Search_Page/SearchSVG.svg"
import PlusSVG from "@/assets/Search_Page/PlusSVG.svg"
import Category from "@/components/Category.vue";
import ResultResearch from "@/components/ResultResearch.vue";

export default {
  components: {DatePicker, Filter, Category, ResultResearch},
  props: {
    categories: {
      type: Array,
      required: true,
    }
  },
  setup() {
    return {SearchSVG, PlusSVG}
  },
  computed: {
  },
  data() {
    return {
        city: '',
        country: '',
        totalResults: '0',
        searchTextTo: ''
    };
  },
    methods: {
        handleSearch() {
            // Mettre à jour le store
            this.$store.commit('setSearchTextTo', this.searchTextTo);

            // Extraire la ville et le pays
            this.extractCityAndCountry();
        },
        handleValidate() {
           // Vérifier si le store est complet
            const searchTextTo = this.$store.getters.getSearchTextTo;
            if (searchTextTo === null) {
                console.log("searchTextTo is null");
                return;
            }

            const searchTextFrom = this.$store.getters.getSearchTextFrom;
            if (searchTextFrom === null) {
                console.log("searchTextFrom is null");
                return;
            }

            const activities = this.$store.getters.getActivities;
            if (activities.Hotels === null) {
                console.log("Hotels is null");
                return;
            }
            if (activities.Restaurants === null) {
                console.log("Restaurants is null");
                return;
            }
            if (activities.Bars === null) {
                console.log("Bars is null");
                return;
            }
            if (activities.Activités === null) {
                console.log("Activités is null");
                return;
            }

            const dates = this.$store.getters.getDates;
            if (dates.startDate === null) {
                console.log("startDate is null");
                return;
            }
            if (dates.endDate === null) {
                console.log("endDate is null");
                return;
            }

            // Envoyer les données au serveur
            const dataToSend = {
                activities: {...activities},
                dates: {...dates}
            }
            console.log(dataToSend);
        },
        extractCityAndCountry() {
            // La chaîne de recherche doit être analysée pour extraire la ville et le pays
            // Ici, on suppose que la ville est simplement la première partie de la chaîne
            // et le pays est la deuxième partie après une virgule (si elle existe)
            const searchParts = this.searchTextTo.split(", ");
            let city = searchParts[0].trim();
            let country = "";
            if (searchParts.length > 1) {
                country = searchParts[1].trim();
            }
            // Mettre à jour les variables city et country
            this.city = city;
            this.country = country;
        },
        updateSearchTextTo(event) {
            const newValue = event.target.value;
            this.$store.commit("setSearchTextTo", newValue)
        }
    },
    mounted() {
        // Listen if searchTextFrom is updated in store
        this.$store.subscribe((mutation, state) => {
            if (mutation.type === 'setSearchTextTo') {
                this.searchTextTo = state.searchTextTo;

                // Extraire la ville et le pays
                this.extractCityAndCountry();
            }
        });
    }
}
</script>
<style>

.search-container {
  display: flex;
  align-content: center;
  align-items: center;
  justify-items: center;
  justify-content: center;
  flex-direction: row;
  margin-top: 10px;
}

.search {
  display: flex;
  align-items: center;
}

.search-wrapper {
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.search-add {
  display: flex;
  align-items: center;
}

.search-plus {
  height: 10px;
  min-width: 10px;
  padding: 0;
}

.search-info {
  display: flex;
  align-items: center;
  height: 60px;
  color: #464646;
  border: 3px solid #F5F5F5;
  border-radius: 90px;
  padding: 5px;
  width: 55vw;
  margin: 10px;
}

.search-info .v-field {
  font-family: 'Montserrat', sans-serif;
  font-style: normal;
  line-height: 100%;
  font-size: 16px;
  font-weight: 400;
}

.search-icon {
  padding-top: 8px;
}

.search-plus {
  margin-left: 10px;
  width: 25px;
  height: 25px;
  background-color: #164465;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  border-radius: 8px;
  transition: background-color 0.2s, opacity 0.2s;
}


.search-plus:hover {
  background-color: #999999;
  opacity: 0.8;
}

.plus-icon {
  max-width: 100%;
  max-height: 100%;
}

.validate-btn {
  background-color: #164465;
  color: #ffffff;
  font-family: 'Montserrat', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 100%;
  text-align: center;
  border-radius: 90px;
  padding: 10px 20px;
  margin: 10px;
  transition: background-color 0.2s, opacity 0.2s;
}
</style>