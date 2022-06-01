<template>
  <div>
		<div v-if="!loading">
			<div>
				{{completeMenu}}
			</div>
		</div>
	</div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
	
	computed: {
		...mapGetters(
			{
				menus1: "getMenusDescription1",
				menus2: "getMenusDescription2",
				menus3: "getMenusDescription3",
				completeMenu: "getCompleteMenu",
				loading: "loading"
			})
	},

	methods: {
		...mapActions(
			{
				setMenus1: "getMenusDescription1",
				setMenus2: "getMenusDescription2",
				setMenus3: "getMenusDescription3",
				setMenu: "getUsersMenus"
			})
	},

	async mounted (){
		await this.setMenus1()
		await this.setMenus2()
		await this.setMenus3()
		await this.setMenu()
	}
}
</script>

<style>

</style>