<template>
  <div v-if="!loading">
    <div class="pa-10">
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
