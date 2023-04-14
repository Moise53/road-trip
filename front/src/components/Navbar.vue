<template>
  <nav class="navbar">
    <div class="navbar-left">
      <a class="navbar-brand" href="/">Epic Road Trip</a>
    </div>
    <div class="navbar-right">
      <v-menu>
        <template v-slot:activator="{ props }">
          <div v-bind="props" class="user-info">
            <img :src="userAvatar" alt="User avatar" class="user-avatar">
            <span class="user-name">{{ userName }}</span>
          </div>
        </template>
        <v-list>
          <v-list-item
              v-for="(item, index) in items"
              :key="index"
              :value="index"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data: () => ({
    items: [
      {title: 'Account'},
      {title: 'Parameter'},
      {title: 'Sign Out'}
      ,
    ],
  }),
  props: {
    userAvatar: {
      type: String,
      required: true
    },
    userName: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Hurricane&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,800;1,100;1,200;1,300;1,400&display=swap');

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  padding: 0.5rem 1rem;
}

.navbar-left {
  display: flex;
  align-items: center;
}

.navbar-brand {
  font-family: 'Hurricane', cursive;
  font-size: 3rem;
  text-decoration: none;
  color: #009499;
}

.navbar-right {
  display: flex;
  align-items: center;
}

.user-avatar {
  width: 2.5rem;
  height: 2.5rem;
  object-fit: cover;
  border-radius: 5px;
  margin-right: 2px;
}

.user-name {
  font-family: "Montserrat", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
}

.user-info {
  display: flex;
  align-items: center;
  background-color: #F1F1F1;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 6px;
  padding: 5px;
  margin: 5px;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
}

.user-info:hover {
  background-color: #cbcbcb;
  cursor: pointer;
}
</style>
