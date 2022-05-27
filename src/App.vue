<template>
  <v-app>
    <v-main>
      <!-- v-if="authenticated" -->
      <template>
        <TopBar @authenticated="setAuthenticated" />
        <SideBar />
      </template>
      <router-view  @authenticated="setAuthenticated" />
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
    }
  },
  mounted() {
    // if(!this.authenticated) {
    //   this.$router.replace({ name: "login" });
    // }
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