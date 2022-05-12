<template>
  <v-app>
    <v-main>
      <template v-if="authenticated">
        <TopBar />
        <SideBar />
      </template>
      <div>
        <router-link v-if="authenticated" to="/" v-on:click.native="logout()">Log out</router-link>
      </div>
      <router-view :user="mockAccount" @authenticated="setAuthenticated" />
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
      mockAccount: {
        username: "1",
        password: "1"
      }
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