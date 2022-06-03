<template>
  <v-app>
    <v-main>
      <!-- v-if="authenticated" -->
      <template>
        <TopBar v-if="authenticated" />
        <!-- <SideBar /> -->
        <!-- <SideBar1 :drawer="drawer" /> -->
      </template>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import TopBar from './components/TopBar.vue';
import { mapActions, mapGetters } from "vuex";

export default {
  name: 'App',

  components:{
    TopBar,
  },

  mounted() {
    if(!this.authenticated) {
      this.$router.replace({ name: "login" });
    }
  },

  computed: {
    ...mapGetters({
      authenticated: "getAuthentication"
    })
  },

  methods: {
    ...mapActions({
      authenticationFalse: "setAuthenticationFalse",
      authenticationTrue: "setAuthenticationTrue"
    }),

    toggleDrawer(){
      this.drawer = !this.drawer
    },
    logout() {
      this.authenticationFalse;
    }
  }
};
</script>
<style scoped>
</style>