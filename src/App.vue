<template>
  <v-app>
    <v-main>
      <TopBar />
      <v-content>
        <side-bar />
        <router-view />
      </v-content>
    </v-main>
  </v-app>
</template>

<script>
import SideBar from './components/SideBar.vue';
import TopBar from './components/TopBar.vue';


export default {
  components: {
    TopBar,
    SideBar,
  },

  name: 'App',

  data: () => ({
    authenticated: false,
    mockAccount: {
      username: "nraboy",
      password: "password"
    },

    mounted() {
      if(!this.authenticated) {
        this.$router.replace({ name: "login" });
      }
    },
    methods: {
      setAuthenticated(status) {
        this.authenticated = status;
      },
      logout() {
        this.authenticated = false;
      }
    }

  }),
};
</script>
<style scoped>
ul {
  padding-left: 0;
}
</style>