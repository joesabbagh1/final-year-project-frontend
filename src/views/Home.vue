<template>
  <div>
		<v-container fluid class="mt-8">
			<v-row align="center" justify="center">
				<v-col v-if="titleSelectedContent[0] == null" align="center">
					<v-img
						src="https://www.evolucare.com/wp-content/uploads/2020/03/Fattal-logo.png"
						width="600px"
					/>	
				</v-col>
				<v-col cols="3" v-for="node in titleSelectedContent" :key="node.title">
					<v-dialog
						width="1000"
					>
						<template v-slot:activator="{ on, attrs }">
							<div 
								class="py-8 px-2 mx-2 elevation-1 rounded-lg text-h6 text-center"
								v-bind="attrs"
          			v-on="on"
								@click="refresh"
							>
								{{node.title}}
							</div>
						</template>
						<template v-if="node.nodeId === 'SF_10016'">
							<sales-rep />
						</template>
						<template v-if="node.nodeId === 'SYS_10001'">
							<MenuAccess />
						</template>
						<template v-if="node.nodeId === 'SYS_10002'">
							<node-form />
						</template>
						<template v-if="node.nodeId === 'SYS_10004'">
							<UsersTable />
						</template>
						<template v-if="node.nodeId === 'SYS_10005' && !loading">
							<user-access :accessType="'UA0000'" />
						</template>
						<template v-if="node.nodeId === 'SYS_10006' && !loading">
							<user-access :accessType="'UA0006'" />
						</template>
						<template v-if="node.nodeId === 'SYS_10009' && !loading">
							<user-access :accessType="'UA0009'" />
						</template>
						<template v-if="node.nodeId === 'SYS_10007'">
							<variable-details />
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
import MenuAccess from '@/components/MenuAccess.vue';
import VariableDetails from '@/components/VariableDetails.vue';
import SalesRep from '@/components/SalesRep.vue';
import UserAccess from '@/components/UserAccess.vue';
export default {
    name: "Home",

		data(){
			return{
				loading: false
			}
		},
    
    computed: {
        ...mapGetters({
            users: "getUsers",
            completeMenu: "getCompleteMenu",
            titleSelectedContent: "getTitleSelectedContent",
        })
    },
    methods: {
        ...mapActions({
            setMenu: "getUsersMenus"
        }),

				refresh(){
					this.loading = true
					setTimeout(() => {
						this.loading = false
					}, 10);
				}
    },
    async mounted() {
        await this.setMenu();
    },
    components: { UsersTable, NodeForm, MenuAccess, VariableDetails, SalesRep, UserAccess }
}
</script>