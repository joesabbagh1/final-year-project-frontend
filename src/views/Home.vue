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
						<v-card>
							<v-card-text>
								<v-form>
									
									<v-container fluid class="pt-10">
										<v-row align="">
											<v-col cols="3" >
												<v-subheader class="text-subtitle-1 black--text px-0">
													Node ID
												</v-subheader>
											</v-col>
											<v-col class="py-0">
												<v-text-field
													class="py-0"
													single-line
												></v-text-field>
											</v-col>
										</v-row>
										<v-row align="center">
											<v-col cols="3" class="py-0">
												<v-subheader class="text-subtitle-1 black--text px-0">
													Application Name
												</v-subheader>
											</v-col>
											<v-col class="py-0">
												<v-text-field
													class="py-0"
													single-line
												></v-text-field>
											</v-col>
										</v-row>
										<v-row align="center	">
											<v-col cols="3" class="py-0">
												<v-subheader class="text-subtitle-1 black--text px-0">
													Application Desc EN
												</v-subheader>
											</v-col>
											<v-col class="py-0">
												<v-text-field
													class="py-0"
													single-line
												></v-text-field>
											</v-col>
										</v-row>
										<v-row align="center">
											<v-col cols="3" class="py-0">
												<v-subheader class="text-subtitle-1 black--text px-0">
													Application Desc AR
												</v-subheader>
											</v-col>
											<v-col class="py-0">
												<v-text-field
													class="py-0"
													single-line
												></v-text-field>
											</v-col>
										</v-row>
										<v-row align="center">
											<v-col cols="3" class="py-0">
												<v-subheader class="text-subtitle-1 black--text px-0">
													Application Path
												</v-subheader>
											</v-col>
											<v-col class="py-0">
												<v-text-field
													class="py-0"
													single-line
												></v-text-field>
											</v-col>
										</v-row>
										<v-row align="center">
											<v-col cols="3" class="py-0">
												<v-subheader class="text-subtitle-1 black--text px-0">
													Report Name
												</v-subheader>
											</v-col>
											<v-col class="py-0">
												<v-text-field
													class="py-0"
													single-line
												></v-text-field>
											</v-col>
										</v-row>
										<v-row>
											<v-col class="py-0" align="center">
												<v-checkbox
													dense
													class="black--text"
													label="Active"
												></v-checkbox>
											</v-col>
										</v-row>
									</v-container>
								</v-form>
								<v-divider></v-divider>
								<v-tabs
									v-model="tab"
								>
									<v-tab>
										Main
									</v-tab>
									<v-tab>
										Queries
									</v-tab>
									<v-tabs-items v-model="tab">
										<v-tab-item>
											<v-container fluid class="pt-10">
												<v-row align="start">
													<v-col cols="3" class="py-0">
														<v-subheader class="text-subtitle-1 black--text px-0">
															SQL Query
														</v-subheader>
													</v-col>
													<v-col>
														<v-textarea
															outlined
														></v-textarea>
													</v-col>
												</v-row>
												<v-row>
													<v-col cols="3" >
														<v-subheader class="text-subtitle-1 black--text px-0">
															Tree Menu Level 01
														</v-subheader>
													</v-col>
													<v-col class="py-0">
														<v-select
															single-line
														></v-select>
													</v-col>
												</v-row>
												<v-row align="center">
													<v-col cols="3" class="py-0">
														<v-subheader class="text-subtitle-1 black--text px-0">
															Tree Menu Level 02
														</v-subheader>
													</v-col>
													<v-col class="py-0">
														<v-select
															single-line
														></v-select>
													</v-col>
												</v-row>
												<v-row align="center">
													<v-col cols="3" class="py-0">
														<v-subheader class="text-subtitle-1 black--text px-0">
															Tree Menu Level 03
														</v-subheader>
													</v-col>
													<v-col class="py-0">
														<v-select
															single-line
														></v-select>
													</v-col>
												</v-row>
												<v-row align="center">
													<v-col cols="3" class="py-0">
														<v-subheader class="text-subtitle-1 black--text px-0">
															Tree Menu Level 04
														</v-subheader>
													</v-col>
													<v-col class="py-0">
														<v-select
															single-line
														></v-select>
													</v-col>
												</v-row>
												<v-row align="center">
													<v-col cols="3" class="py-0">
														<v-subheader class="text-subtitle-1 black--text px-0">
															Tree Menu Level 05
														</v-subheader>
													</v-col>
													<v-col class="py-0">
														<v-select
															single-line
														></v-select>
													</v-col>
												</v-row>
											</v-container>
										</v-tab-item>
										<v-tab-item>

										</v-tab-item>
									</v-tabs-items>
								</v-tabs>
							</v-card-text>
						</v-card>
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
export default {
    name: "Home",
    data() {
        return {
            search: "",
            tab: "",
        };
    },
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
    components: { UsersTable }
}
</script>