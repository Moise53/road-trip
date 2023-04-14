<template>
  <div class="category">
    <v-btn v-for="category in categories" :key="category.name" class="ma-2"
           @click="toggleCategorie(category)" v-bind:class="{'red': category.visible}">
      {{ category.name }}
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "category",
  props: ["categories"],
  methods: {

    toggleCategorie(category) {
      category.visible = !category.visible;
      this.$store.commit('markerIsVisible', {category: category, visible: category.visible})
    },
  },
};
</script>

<style scoped>
.category {
  display: flex;
  justify-items: center;
  align-items: center;
  margin-top: 10px;
  flex-wrap: wrap;
}

.red {
  border-width: 0 !important;
  background-color: #164465;
  color: white !important;
}

.v-btn {
  justify-content: start;
  border-radius: 15px;
  font-family: 'Montserrat', serif;
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 18px;
  color: #164465;
  border: solid;
  border-width: 2px;
  width: 140px !important;
  height: 50px !important;
  text-transform: none;
}
</style>
