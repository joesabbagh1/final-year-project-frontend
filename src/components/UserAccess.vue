<template>
  <v-card>
    <v-card-title>
      <div>
        User Access - 
        <span v-if="accessType == companies">
          Companies
        </span>
        <span v-if="accessType == branch">
          Branch
        </span>
        <span v-if="accessType == salesRepGroups">
          SalesRep Groups
        </span>
      </div>
      <div v-if="accessType == companies" class="ml-16">
        {{company.description}}
      </div>
      <v-select 
        v-if="accessType !== companies"
        :items="accessType == branch ? titlesBranch : titlesSalesRepGroups"
        v-model="selectedTitle"
        @input="checkUsersAccess"
        class="pl-7"
      >
      </v-select>
    </v-card-title>
    <v-card-text v-if="!selectedTitle && accessType !== companies">
      <div v-if="accessType == branch">
        Please select a branch.
      </div>
      <div v-if="accessType == salesRepGroups">
        Please select a sales Rep Group.
      </div>
    </v-card-text>
    <v-card-text v-else-if="!loading">
      <v-data-table
        :headers="headers"
        :items="users"
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
  props: ['accessType'],
  data(){
    return{
      companies: 'UA0000',
      branch: 'UA0006',
      salesRepGroups: 'UA0009',
      selectedTitle: '',
      accessVariable: '',
      headers: [
        {	text: 'userID',value: 'userID' },
        { text: 'fullname', value: 'fullname' },
        { text: 'username', value: 'username' },
        { text: 'password', value: 'password' },
        { text: 'email', value: 'email' },
        { text: 'isActive', value: 'isActive' },
        {	text: 'access', value: 'access' },
      ],
    }
  },


  async created(){
    this.setLoading(true)
    console.log(435);
    if (this.accessType == this.companies) {
      let accessType = this.accessType
      let accessVariable = this.company.compNo
      await this.checkUsersAccessStore({accessType, accessVariable})
      this.checkUsersAccess()
    }
    if (this.accessType == this.branch) {
      await this.setUserAccessTitlesBranch()
    }
    if (this.accessType == this.salesRepGroups) {
      await this.setUserAccessTitlesSalesRepGroups()
    }
    this.setLoading(true)
  },

  computed:{
    ...mapGetters({
      company: "getSelectedCompany",
      users: "getUsers",
      usersAccess: "getUsersAccess",
      usersAccessTitlesBranch: "getUsersAccessTitlesBranch",
      usersAccessTitlesSalesRepGroups: "getUsersAccessTitlesSalesRepGroups",
      loading: "getLoading"
    }),
    
    titlesBranch(){
			return this.usersAccessTitlesBranch.map(item => item.description)
		},
    titlesSalesRepGroups(){
			return this.usersAccessTitlesSalesRepGroups.map(item => item.description)
		},
  },

  methods:{
    ...mapActions({
      checkUsersAccessStore: "checkUsersAccess",
      setLoading: "setLoading",
      createUserAccess: "createUserAccess",
      deleteUserAccess: "deleteUserAccess",
      setUserAccessTitlesBranch: "setUserAccessTitlesBranch",
      setUserAccessTitlesSalesRepGroups: "setUserAccessTitlesSalesRepGroups",
		}),

    async checkUsersAccess(){
      this.setLoading(true)
      if(this.accessType !== this.companies){
        let accessType = this.accessType
        let accessVariable = accessType == this.branch ? this.usersAccessTitlesBranch.find(item => item.description == this.selectedTitle).subVariableCode : this.usersAccessTitlesSalesRepGroups.find(item => item.description == this.selectedTitle).subVariableCode
        this.accessVariable = accessVariable
        await this.checkUsersAccessStore({accessType, accessVariable})
      }
      this.users.forEach((v1,i,a) => {
        v1.access = this.usersAccess.find(v2 => v2.userID == v1.userID) ? true : false
      })
      setTimeout(() => {
        this.setLoading(false)
      }, 500);
      this.setLoading(false)
    },
    
    checkBox(val){
      let userAccess = {}
      userAccess.userID = val.userID 
      userAccess.accessType = this.accessType
      userAccess.accessVariable1 = this.accessType == this.companies ? this.company.compNo : this.accessVariable
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