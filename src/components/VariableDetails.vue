<template>
  <v-card>
    <v-card-title>
      <div>
        Variable Details
      </div>
      <v-select
        v-model="selectedVariable"
        :items="titles"
        @input="setDetails"
        dense
        flat
        class="px-10 py-0"
      ></v-select>
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
										label="CompNo"
									></v-text-field>
								</v-col>
								<v-col
									cols="12"
									sm="6"
									md="4"
								>
									<v-text-field
										v-model="editedItem.variableCode"
										label="VariableCode"
									></v-text-field>
								</v-col>
								<v-col
									cols="12"
									sm="6"
									md="4"
								>
									<v-text-field
										v-model="editedItem.subVariableCode"
										label="SubVariableCode"
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
										label="Alt_Description"
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
    <v-card-text v-if="!loading">
      <v-data-table
        :headers="headers"
        :items="varDetails"
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
      </v-data-table>
    </v-card-text>
    <v-card-text v-else>
      <v-container>
        <v-row justify="center" align="center" style="height:70vh">
          <v-col align="center">
            <v-progress-circular
              indeterminate
              color="primary"
              class="text-center fill-height"
            ></v-progress-circular>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {

  data(){
    return{
			dialog: false,
			dialogDelete: false,
      selectedVariable: '',
      headers: [
				{	text: 'actions', value: 'actions', sortable:false, align: 'start' },
        { text: 'compNo', value: 'compNo' },
        { text: 'VariableCode', value: 'variableCode' },
        { text: 'SubVariableCode', value: 'subVariableCode' },
        { text: 'Description', value: 'description' },
        { text: 'Alt_Description', value: 'alt_Description' },
      ],
			editedItem: {
				compNo: null,
				variableCode: '',
				subVariableCode: '',
				description: '',
				alt_Description: '',
			},
			defaultItem: {
				compNo: null,
				variableCode: '',
				subVariableCode: '',
				description: '',
				alt_Description: '',
			},
    }
  },

	watch: {
		dialog (val) {
			val || this.close()
		},
		dialogDelete (val) {
			val || this.closeDelete()
		},
	},

  async mounted(){
    await this.setVariableHeadersTitles(this.company.compNo)
  },

  computed:{
    ...mapGetters({
			variableDetailsTitles: "getVariableDetailsTitles",
			company: "getSelectedCompany",
			varDetails: "getVariableDetailsByCode",
      loading: "getLoading"
    }),

		titles(){
			return this.variableDetailsTitles.map(v => {
				return v.description
			})
		}
  },

  methods:{
    ...mapActions({
			setVariableHeadersTitles: "setVariableHeadersTitles",
			setVariableDetailsByCode: "setVariableDetailsByCode",
			createVariable: "createVariable",
			updateVariable: "updateVariable",
			deleteVariable: "deleteVariable",
      setLoading: "setLoading",
		}),

		setDetails(){
			this.setLoading(true)
			this.variableDetailsTitles.find(v => {
				if(v.description == this.selectedVariable){
					let compNo = this.company.compNo
					let variableCode = v.variableCode
					this.setVariableDetailsByCode({compNo, variableCode})
				}
			})
			this.setLoading(false)
		},

    	editItem (item) {
			this.editedIndex = this.varDetails.indexOf(item)
			this.editedItem = Object.assign({}, item)
			this.dialog = true
		},

		deleteItem (item) {
			this.editedIndex = this.varDetails.indexOf(item)
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

		async save () {
			let editedIndex = this.editedIndex
			let editedItem = this.editedItem
			if (this.editedIndex > -1) {
				await this.updateVariable(editedItem)
				this.setDetails()
			} else {
				await this.createVariable(this.editedItem)
				this.setDetails()
			}
			this.close()
		},

  }

}
</script>

<style>

</style>