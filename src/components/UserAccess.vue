<template>
  <v-card>
    <v-card-title>
      <div>
        User Access - Companies
      </div>
    </v-card-title>
    <v-card-text v-if="!loading">
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

  data(){
    return{
      accessType: 'UA0000',
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

  async mounted(){
    let accessType = this.accessType
    let accessVariable = this.company.compNo
    await this.checkUsersAccessStore({accessType, accessVariable})
    this.checkUsersAccess()
  },

  computed:{
    ...mapGetters({
      users: "getUsers",
      company: "getSelectedCompany",
      usersAccess: "getUsersAccess",
      loading: "getLoading"
    }),

  },

  methods:{
    ...mapActions({
      checkUsersAccessStore: "checkUsersAccess",
      setLoading: "setLoading",
      createUserAccess: "createUserAccess",
      deleteUserAccess: "deleteUserAccess"
		}),

    async checkUsersAccess(){
      this.setLoading(true)
      this.users.forEach((v1,i,a) => {
        v1.access = false
        this.usersAccess.forEach((v2, i2) => {
          if (v2.userID === v1.userID) {
            v1.access = true
          }
          // v2.userID == v1.userID ? v1.access = true : v1.access = false
        })
      })
      this.setLoading(false)
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