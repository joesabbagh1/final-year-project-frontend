<template>
<div>
  <v-app-bar
    color="grey"
    elevation="0"
  >

    <v-app-bar-nav-icon @click.stop="toggleDrawer"></v-app-bar-nav-icon>
    <v-toolbar-title>Welcome</v-toolbar-title>

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
        v-for="item in data"
        :key="item.title"
			>
				<template v-slot:activator>
          <v-list-item-title> 
            {{item.title}}
          </v-list-item-title>
				</template>
        <v-list-group
          v-for="(subTitle,i) in item.subTitles" 
          :key="i"
          sub-group
        >
          <template v-slot:activator >
            <v-list-item-title > 
              {{subTitle.title}}
            </v-list-item-title>
          </template>
          <v-list-item v-for="(subTitle2, i) in subTitle.subTitles" :key="i">
            <v-list-item-title>
              {{subTitle2.title}}
            </v-list-item-title>
          </v-list-item>
        </v-list-group>
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
export default {

  data(){
    return {
      drawer: false,
      data:[ { "title": "Suppliers & Surveys", "subTitles": [ { "title": "Setup" }, { "title": "Suppliers" }, { "title": "Survey" }, { "title": "Tasks" }, { "title": "Market Insight" } ] }, { "title": "Automated Sales Force", "subTitles": [ { "title": "Setup" }, { "title": "Tools" }, { "title": "Messages/Notes" }, { "title": "GPS File" }, { "title": "Inquiry" }, { "title": "GPS File", "subTitles": [ { "title": "Google Earth" } ] }, { "title": "Routes" } ] }, { "title": "Nielsen", "subTitles": [ { "title": "Utility" } ] }, { "title": "System Setup", "subTitles": [ { "title": "Utility" } ] } ]
    }
  },

  methods:{
    toggleDrawer(){
      this.drawer = !this.drawer
    },
    logout(){
      this.$emit("authenticated", false);
      this.$router.push('/login')
      window.location.reload();
    }
  }


}
</script>

<style>

</style>