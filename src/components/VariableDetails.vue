<template>
	<v-card>
		<v-card-title>
			<v-text-field
				v-model="search"
				prepend-icon="mdi-magnify"
				label="Search"
				single-line
				dense
				class="pr-10"
			></v-text-field>
			<v-dialog
				v-model="dialog"
				max-width="500px"
			>
				<template v-slot:activator="{ on, attrs }">
					<v-btn
						color="black"
						dark
						class="mb-2"
						v-bind="attrs"
						v-on="on"
					>
						New Item
					</v-btn>
				</template>
				<v-card>
					<v-card-text>
						<v-container>
							<v-row>
								<v-col
									cols="12"
									sm="6"
									md="4"
								>
									<v-text-field
										v-model="editedItem.compNo"
										label="Comp No"
									></v-text-field>
								</v-col>
								<v-col
									cols="12"
									sm="6"
									md="4"
								>
									<v-text-field
										v-model="editedItem.variableCode"
										label="Variable Code"
									></v-text-field>
								</v-col>
								<v-col
									cols="12"
									sm="6"
									md="4"
								>
									<v-text-field
										v-model="editedItem.subVariableCode"
										label="Sub Variable Code"
									></v-text-field>
								</v-col>
								<v-col
									cols="12"
									sm="6"
									md="4"
								>
									<v-text-field
										v-model="editedItem.description"
										label="Description"
									></v-text-field>
								</v-col>
								<v-col
									cols="12"
									sm="6"
									md="4"
								>
									<v-text-field
										v-model="editedItem.alt_Description"
										label="Alt Description"
									></v-text-field>
								</v-col>
							</v-row>
						</v-container>
					</v-card-text>

					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn
							color="blue darken-1"
							text
							@click="close"
						>
							Cancel
						</v-btn>
						<v-btn
							color="blue darken-1"
							text
							@click="save"
						>
							Save
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>
			<v-dialog v-model="dialogDelete" max-width="500px">
				<v-card>
					<div class="text-h6 text-center pt-5">Are you sure you want to delete this item?</div>
					<v-card-actions class="pb-5 pt-3">
						<v-spacer></v-spacer>
						<v-btn class="black mx-3" color="white" text @click="closeDelete">Cancel</v-btn>
						<v-btn class="black mx-3" color="white" text @click="deleteItemConfirm">Yes</v-btn>
						<v-spacer></v-spacer>
					</v-card-actions>
				</v-card>
			</v-dialog>
		</v-card-title>
		<v-card-text>
			<v-data-table
				:headers="headers"
				:items="variables"
				:search="search"
				class="elevation-1"
			>
					
				<template v-slot:[`item.actions`]="{ item }">
					<v-icon
						small
						class="mr-2"
						@click="editItem(item)"
					>
						mdi-pencil
					</v-icon>
					<v-icon
						small
						@click="deleteItem(item)"
					>
						mdi-delete
					</v-icon>
				</template>
				<template v-slot:no-data>
					<v-btn
						color="primary"
						@click="initialize"
					>
						Reset
					</v-btn>
				</template>
			</v-data-table>
		</v-card-text>
	</v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
	data: () => ({
		dialog: false,
		dialogDelete: false,
		headers: [
			{	text: 'actions', value: 'actions', sortable:false, align: 'start' },
			{	text: 'Comp No',value: 'compNo' },
			{ text: 'Variable Code', value: 'variableCode' },
			{ text: 'Sub Variable Code', value: 'subVariableCode' },
			{ text: 'Description', value: 'description' },
			{ text: 'Alt Description', value: 'alt_Description' },
		],
		search:'',
		editedIndex: -1,
		editedItem: {
			CompNo: 0,
			VariableCode: '',
			SubVariableCode: '',
			Description: '',
			Alt_Description: '',
		},
		defaultItem: {
			CompNo: 0,
			VariableCode: '',
			SubVariableCode: '',
			Description: '',
			Alt_Description: '',
		},
	}),

	computed: {

	...mapGetters(
		{
			variables: "getVariableDetails",
			loading: "loading"
		}),

		formTitle () {
			return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
		},
	},

	watch: {
		dialog (val) {
			val || this.close()
		},
		dialogDelete (val) {
			val || this.closeDelete()
		},
	},

  mounted(){
    this.setVariableDetails()
  },

	methods: {
		...mapActions({
      setVariableDetails: "setVariableDetails",
			createVariable: "createVariable",
			updateVariable: "updateVariable",
			deleteVariable: "deleteVariable",
		}),

		editItem (item) {
			this.editedIndex = this.variables.indexOf(item)
			this.editedItem = Object.assign({}, item)
			this.dialog = true
		},

		deleteItem (item) {
			this.editedIndex = this.variables.indexOf(item)
			this.editedItem = Object.assign({}, item)
			this.dialogDelete = true
		},

		deleteItemConfirm () {
			this.deleteVariable(this.editedIndex)
			this.closeDelete()
		},

		close () {
			this.dialog = false
			this.$nextTick(() => {
				this.editedItem = Object.assign({}, this.defaultItem)
				this.editedIndex = -1
			})
		},

		closeDelete () {
			this.dialogDelete = false
			this.$nextTick(() => {
				this.editedItem = Object.assign({}, this.defaultItem)
				this.editedIndex = -1
			})
		},

		save () {
			let editedIndex = this.editedIndex
			let editedItem = this.editedItem
			if (this.editedIndex > -1) {
				this.updateVariable({editedIndex, editedItem})
			} else {
				// let ids = this.users.map(e => {
				// 	return e.userID
				// })

				// let max = ids[0];
				// for (let i = 1; i < ids.length; ++i) {
				// 	if (ids[i] > max) {
				// 		max = ids[i];
				// 	}
				// }

				// this.editedItem.userID = max + 1
				// this.users.push(this.editedItem)
				console.log(this.editItem);
				this.createVariable(this.editedItem)
			}
			this.close()
		},
	},
}
</script>