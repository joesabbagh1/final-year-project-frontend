<template>
  <div v-if="!loading">
    <router-link to="/test" class="pa-10 text-pink-400">
			xcc	
  	</router-link>
		<div>
			{{completeMenu}}
		</div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: 'Home',
  
	computed: {
		...mapGetters(
			{
				completeMenu: "getCompleteMenu",
				loading: "loading"
			})
	},

	methods: {
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