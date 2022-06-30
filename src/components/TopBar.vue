<template>
  <div>
    <v-app-bar
      color="transparent"
      elevation="0"
    >

      <v-app-bar-nav-icon @click.stop="toggleDrawer"></v-app-bar-nav-icon>

      <v-spacer></v-spacer>
      <div class="text-h6 font-weight-medium black--text" @click="logout()" style="cursor: pointer;">
        Log out
      <v-icon color="black" size="30">mdi-logout</v-icon>
      </div>

    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      temporary
      absolute
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            Salesforce
          </v-list-item-title>
          <v-list-item-subtitle>
            {{fullname}}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list>
        <v-list-group
          v-for="(item, index1) in completeMenu"
          :key="item.title"
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title class=" font-weight-medium"> 
                {{item.title}}
              </v-list-item-title>
            </v-list-item-content>
          </template>
          <!-- <template>
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
          </template> -->
          <template v-if="item.subTitles">
            <v-list-item class="grey lighten-5 pl-10" v-for="(subTitle, index2) in item.subTitles" :key="subTitle.title"  @click.stop="displayContent(index1, index2); toggleDrawer()" style="cursor: pointer;">
              <v-list-item-title>
                {{subTitle.title}}
              </v-list-item-title>
            </v-list-item>
          </template>
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
        fullname:"getFullname"
			})
	},

  methods:{
    ...mapActions(
      {
        setMenu: "getUsersMenus",
        setAuthFalse: "setAuthenticationFalse"
      }),
      
    toggleDrawer(){
      this.drawer = !this.drawer
    },
    logout(){
      this.setAuthFalse();
      this.$router.push('/login')
    },

    displayContent(index1, index2){
      this.$store.dispatch('setTitleSelectedContent', [index1, index2])
    }
	},
  
  async mounted (){
		await this.setMenu()
	}

}
</script>

<style>

</style>