<template>
  <div class="filter-container">

    <v-badge class="filter-badge" :content="numCheckedItems">
      <v-menu :close-on-content-click="false">
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" class="filter-div">
            <img :src="FilterSVG" alt="Filtre Icon" class="filter-icon"/>
            <p>Filtre</p>
          </v-btn>
        </template>

        <v-list>
          <v-list-subheader>Filtres</v-list-subheader>
          <v-list-item
              v-for="(item, i) in items"
              :key="i"
              class="my-vlist"
              style="width: 20vw"
          >
            <v-checkbox
                class="my-checkbox"
                color="indigo"
                v-model="item.checked"
            >
              <template v-slot:label>
                <div class="filter-item">{{ item.title }}</div>
              </template>
            </v-checkbox>
            <v-list-item-title v-text=""></v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-badge>
  </div>
</template>

<script>
import FilterSVG from "@/assets/Search_Page/FilterSVG.svg";

export default {
  name: "Filter",
  setup() {
    return {
      FilterSVG,
    };
  },
  data: () => ({
    items: [
      {title: "Click Me", checked: false},
      {title: "Click Me", checked: false},
      {title: "Click Me", checked: false},
      {title: "Click Me", checked: false},
    ],
  }),
  computed: {
    numCheckedItems() {
      return this.items.filter((item) => item.checked).length;
    },
  },
};
</script>

<style scoped>
.filter-badge {
  display: flex;
  align-content: center;
  justify-items: center;
  align-items: center;
  justify-content: center;
}
.filter-div {
  font-family: "Montserrat", sans-serif;
  color: white;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 12px;
  text-transform: none;
  border-radius: 28px;
  background-color: #164465;
}

.v-list {
  height: 10px;
  overflow-x: auto;
}

.filter-icon {
  margin-right: 5px;
}

.align-center {
  align-items: center;
}

::v-deep(.my-checkbox) .v-label {
  font-size: 16px;
}

.my-vlist {
  margin-bottom: -30px;
}

.filter-item {
}
</style>
