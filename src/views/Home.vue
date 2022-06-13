<template>
  <div v-if="!loading">
		<v-container fluid class="mt-8">
			<v-row align="center" justify="center">
				<v-col cols="2" align="center" v-for="node in titleSelectedContent" :key="node.title">
					<v-dialog
						width="1000"
					>
						<template v-slot:activator="{ on, attrs }">
							<div 
								class="py-8 elevation-1 rounded-lg text-h6"
								v-bind="attrs"
          			v-on="on"
							>
								{{node.title}}
								<div>
									{{node.nodeId}}
								</div>
							</div>
						</template>
						<template v-if="node.nodeId === 'SYS_10002'">
							<node-form />
						</template>
						<template v-if="node.nodeId === 'SYS_10004'">
							<UsersTable />
						</template>
					</v-dialog>
				</v-col>
			</v-row>
		</v-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import UsersTable from "@/components/usersTable.vue";
import NodeForm from '@/components/NodeForm.vue';
export default {
    name: "Home",
    
    computed: {
        ...mapGetters({
            users: "getUsers",
            completeMenu: "getCompleteMenu",
            titleSelectedContent: "getTitleSelectedContent",
            loading: "loading"
        })
    },
    methods: {
        ...mapActions({
            setMenu: "getUsersMenus"
        })
    },
    async mounted() {
        await this.setMenu();
    },
    components: { UsersTable, NodeForm }
}
</script>