<template>
  <div class="searchpage">
    <div class="searchpage-left">
      <navbar title="Nom du site" :user-avatar="userAvatar" :user-name="userName"/>
      <from-component/>
      <search-component :categories="categories"/>
    </div>
    <div class="searchpage-right">
      <google-map-component/>
    </div>
  </div>
</template>
<script>
import Navbar from '/src/components/Navbar.vue'
import SearchComponent from '/src/components/SearchComponent.vue'
import GoogleMapComponent from "@/components/GoogleMapComponent.vue";
import FromComponent from "@/components/FromComponent.vue";
import {mapState} from 'vuex'

export default {
  name: 'HomePage',
  components: {
    Navbar,
    SearchComponent,
    GoogleMapComponent,
    FromComponent
  },
  computed: {
    ...mapState({
      categories: state => state.categories,
    }),
  },
  data() {
    return {
      userAvatar: 'src/assets/logo.png',
      userName: 'Dinath',
    };
  }
};
</script>

<style>
.searchpage {
  display: flex;
  flex-direction: row;
  margin: 20px;
}

.searchpage-left {
  flex: 1;
  width: 80%;
  padding: 15px
}

.searchpage-right {
  flex: 1;
  height: 80%;
  padding: 20px;
}

</style>
