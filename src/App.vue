<template>
  <v-app>
    <v-main>
      <template v-if="authenticated">
        <TopBar @authenticated="setAuthenticated" />
        <SideBar />
      </template>
      <router-view :users="mockAccounts" @authenticated="setAuthenticated" />
    </v-main>
  </v-app>
</template>

<script>
import SideBar from './components/SideBar.vue';
import TopBar from './components/TopBar.vue';


export default {
  name: 'App',

  components:{
    SideBar,
    TopBar
  },

  data() {
    return {
      authenticated: false,
      mockAccounts: [
      {
        username: "joe",
        password: "1",
        companies: [
          'fattal',
          'google',
          'facebook',
        ]
      },
      {
        username: "elie",
        password: "2",
        companies: [
          'amazon',
          'murex',
        ]
      },
      {
        username: "3",
        password: "3",
        companies: [
          'fattal',
        ]
      }
    ],
    }
  },
  mounted() {
    if(!this.authenticated) {
      this.$router.replace({ name: "login" });
    }
  },
  methods: {
    setAuthenticated(status) {
      this.authenticated = status;
      console.log(this.authenticated)
    },
    logout() {
      this.authenticated = false;
      console.log(this.authenticated)
    }
  }
};
</script>
<style scoped>
</style>