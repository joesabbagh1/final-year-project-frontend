<template>
  <div>
    <v-app-bar
      color="transparent"
      elevation="0"
    >

      <v-app-bar-nav-icon @click.stop="toggleDrawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Welcome {{username}}</v-toolbar-title>

      <v-spacer></v-spacer>

      <div @click="logout()" style="cursor: pointer;">
        Log out
      <v-icon>mdi-logout</v-icon>
      </div>

    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      temporary
      absolute
    >
      <v-list>
        <v-list-group
          :value="false"
          v-for="item in completeMenu"
          :key="item.title"
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title> 
                {{item.title}}
              </v-list-item-title>
            </v-list-item-content>
          </template>
          <template>
            <v-list-group
              v-for="(subTitle,i) in item.subTitles" 
              :key="i"
              sub-group
            >
              <template v-slot:activator >
                <v-list-item-content>
                  <v-list-item-title > 
                    {{subTitle.title}}
                  </v-list-item-title>
                </v-list-item-content>
              </template>
              <v-list-item v-for="(subTitle2, i) in subTitle.subTitles" :key="i">
                <v-list-item-content>

                  <v-list-item-title>
                    {{subTitle2.title}}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-group>
          </template>
          <!-- <v-list-item v-for="subTitle in item.subTitles" :key="subTitle.title">
            <v-list-item-title>
              {{subTitle.title}}
            </v-list-item-title>
          </v-list-item> -->
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {

  data(){
    return {
      drawer: false,
    }
  },

  computed: {
		...mapGetters(
			{
				completeMenu: "getCompleteMenu",
				loading: "loading",
        username:"getUsername"
			})
	},

  methods:{
    toggleDrawer(){
      this.drawer = !this.drawer
    },
    logout(){
      this.$emit("authenticated", false);
      this.$router.push('/login')
    },
    ...mapActions(
			{
				setMenu: "getUsersMenus"
			})
	},
  
  async mounted (){
		await this.setMenu()
	}

}
</script>

<style>

</style>