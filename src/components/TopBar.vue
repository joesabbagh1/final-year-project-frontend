<template>
  <v-app-bar
    color="grey"
    elevation="0"
  >
    <v-toolbar-title>Welcome</v-toolbar-title>

    <v-spacer></v-spacer>


    <div @click="logout()" style="cursor: pointer;">
      Log out
    <v-icon>mdi-logout</v-icon>
    </div>

  </v-app-bar>
</template>

<script>
export default {


  methods:{
    logout(){
      this.$emit("authenticated", false);
      this.$router.go('/')
    }
  }


}
</script>

<style>

</style>