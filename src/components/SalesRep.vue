<template>
  <v-card>
    <v-card-title>
      <div>
        SalesRep Access - Salesrep Groups
      </div>
      <v-select 
        :items="titles"
        v-model="selectedTitle"
        @input="checkUsersAccess"
        dense
        class="pl-7"
      >
      </v-select>
    </v-card-title>
    <v-card-text v-if="!loading">
      <v-row justify="end">
        <v-col cols="3">
          <v-text-field
            v-model="search"
            prepend-icon="mdi-magnify"
            label="Search"
            single-line
            dense
          ></v-text-field>
        </v-col>
      </v-row>
      <v-data-table
        :headers="headers"
        :items="reps"
        :search="search"
        class="elevation-1"
      >
        <template v-slot:[`item.access`]="{ item }">
          <v-checkbox
            v-model="item.access"
            @change="checkBox(item)"
          />
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
      selectedTitle: '',
      search: '',
      headers: [
        {	text: 'SR_ID',value: 'sR_ID' },
        { text: 'SR_Code', value: 'sR_Code' },
        { text: 'SR_Description', value: 'sR_Description' },
        { text: 'SR_Alt_Description', value: 'sR_Alt_Description' },
        { text: 'Default_Org_Group', value: 'default_Org_Grp' },
        { text: 'access', value: 'access' },
      ],
    }
  },


  async mounted(){
    this.setLoading(true)
		let compNo = this.company.compNo
		let variableCode = "UTYP01"
		await this.setSalesReps()
    await this.setVariableDetailsByCode({compNo, variableCode})
    this.setLoading(false)
  },

  computed:{
    ...mapGetters({
      company: "getSelectedCompany",
			varDetails: "getVariableDetailsByCode",
			reps: "getSalesReps",
      usersAccess: "getUsersAccess",
      loading: "getLoading"
    }),

		titles(){
			return this.varDetails.map(item => item.description)
		},
  },

  methods:{
    ...mapActions({
			setSalesReps: "setSalesReps",
      setLoading: "setLoading",
      setVariableDetailsByCode: "setVariableDetailsByCode",
			checkUsersAccessStore: "checkUsersAccess",
		}),

    async checkUsersAccess(){
      this.setLoading(true)
			let accessType = 'UA0007'
			let accessVariable = this.varDetails.find(item => item.description === this.selectedTitle).subVariableCode
			await this.checkUsersAccessStore({accessType, accessVariable})
      this.reps.forEach((v1,i,a) => {
        v1.access = this.usersAccess.find(v2 =>  v2.userID == v1.sR_ID) ? true : false
        console.log(v1.access);
      })
      setTimeout(() => {
        this.setLoading(false)
      }, 500);
    },
    
    checkBox(val){
      let userAccess = {}
      userAccess.userID = val.userID 
      userAccess.accessType = this.accessType
      userAccess.accessVariable1 = this.company.compNo
      userAccess.compNo = 0
      if (val.access) {
        // create
        this.createUserAccess(userAccess)
      }
      else{
        // delete
        this.deleteUserAccess(userAccess)
      }
    }
  }

}
</script>

<style>

</style>