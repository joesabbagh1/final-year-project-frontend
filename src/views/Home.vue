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
									<v-container class="pt-10">
										<v-row align="center">
											<v-col cols="3" class="text-subtitle-1 black--text">
												Node ID
											</v-col>
											<v-col class="py-0">
												<v-text-field
													class="py-0"
													outlined
													single-line
													dense
												></v-text-field>
											</v-col>
										</v-row>
										<v-row align="center">
											<v-col cols="3" class="text-subtitle-1 black--text py-0">
												Application Name
											</v-col>
											<v-col class="py-0">
												<v-text-field
													class="py-0"
													outlined
													single-line
													dense
												></v-text-field>
											</v-col>
										</v-row>
										<v-row align="center">
											<v-col cols="3" class="text-subtitle-1 black--text py-0">
												Application Desc EN
											</v-col>
											<v-col class="py-0">
												<v-text-field
													class="py-0"
													outlined
													single-line
													dense
												></v-text-field>
											</v-col>
										</v-row>
										<v-row align="center">
											<v-col cols="3" class="text-subtitle-1 black--text py-0">
												Application Desc AR
											</v-col>
											<v-col class="py-0">
												<v-text-field
													class="py-0"
													outlined
													single-line
													dense
												></v-text-field>
											</v-col>
										</v-row>
										<v-row align="center">
											<v-col cols="3" class="text-subtitle-1 black--text py-0">
												Application Path
											</v-col>
											<v-col class="py-0">
												<v-text-field
													class="py-0"
													outlined
													single-line
													dense
												></v-text-field>
											</v-col>
										</v-row>
										<v-row align="center">
											<v-col cols="3" class="text-subtitle-1 black--text py-0">
												Report Name
											</v-col>
											<v-col class="py-0">
												<v-text-field
													class="py-0"
													outlined
													single-line
													dense
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
											<v-container>
												<v-row align="center">
													<v-col cols="2" class="text-subtitle-1 black--text">
														SQL Query
													</v-col>
													<v-col>
														<v-textarea
															outlined
														></v-textarea>
													</v-col>
												</v-row>
												<v-row>
													<v-col cols="8">
														<v-row align="center">
															<v-col cols="3" class="text-subtitle-1 black--text">
																Tree Menu Level 01
															</v-col>
															<v-col class="py-0">
																<v-select
																	outlined
																	single-line
																	dense
																></v-select>
															</v-col>
														</v-row>
														<v-row align="center">
															<v-col cols="3" class="text-subtitle-1 black--text">
																Tree Menu Level 02
															</v-col>
															<v-col class="py-0">
																<v-select
																	outlined
																	single-line
																	dense
																></v-select>
															</v-col>
														</v-row>
														<v-row align="center">
															<v-col cols="3" class="text-subtitle-1 black--text">
																Tree Menu Level 03
															</v-col>
															<v-col class="py-0">
																<v-select
																	outlined
																	single-line
																	dense
																></v-select>
															</v-col>
														</v-row>
														<v-row align="center">
															<v-col cols="3" class="text-subtitle-1 black--text">
																Tree Menu Level 04
															</v-col>
															<v-col class="py-0">
																<v-select
																	outlined
																	single-line
																	dense
																></v-select>
															</v-col>
														</v-row>
														<v-row align="center">
															<v-col cols="3" class="text-subtitle-1 black--text">
																Tree Menu Level 05
															</v-col>
															<v-col class="py-0">
																<v-select
																	outlined
																	single-line
																	dense
																></v-select>
															</v-col>
														</v-row>
													</v-col>
													<v-col cols="4">
														<v-row>
															<v-col cols="8">

															</v-col>
															<v-col cols="4">

															</v-col>
														</v-row>
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
							<v-card>
								<v-card-title>
									<v-text-field
										v-model="search"
										prepend-icon="mdi-magnify"
										label="Search"
										single-line
										dense
									></v-text-field>
								</v-card-title>
								<v-card-text>
									<v-data-table
										:headers="headers"
										:items="users"
										dense
										:search="search"
										class="elevation-1"
									></v-data-table>
								</v-card-text>
							</v-card>
						</template>
					</v-dialog>
				</v-col>
			</v-row>
		</v-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: 'Home',
  data(){
		return{
			search: '',
			tab:'',
			headers: [
          {
            text: 'userID',
            align: 'start',
            value: 'userID',
          },
          { text: 'fullname', value: 'fullname' },
          { text: 'username', value: 'username' },
          { text: 'password', value: 'password' },
          { text: 'email', value: 'email' },
          { text: 'isActive', value: 'isActive' },
        ],
			headers: [
          {
            text: 'userID',
            align: 'start',
            value: 'userID',
          },
          { text: 'fullname', value: 'fullname' },
          { text: 'username', value: 'username' },
          { text: 'password', value: 'password' },
          { text: 'email', value: 'email' },
          { text: 'isActive', value: 'isActive' },
        ],
      }
		},

	computed: {
		...mapGetters(
			{
				users: "getUsers",
				completeMenu: "getCompleteMenu",
				titleSelectedContent: "getTitleSelectedContent",
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