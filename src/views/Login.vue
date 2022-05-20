<template>
  <v-container fluid class="grey lighten-3">
    <v-row justify="center" align="center" style="height:100vh">
      <v-col cols="4" class="white rounded-lg">
        <v-form v-model="valid" v-if="!authenticated">
          <v-container fluid>
            <v-row>
              <v-col
                cols="12"
                class="pb-0"
              >
                <div class="pb-1">
                  Username
                </div>
                <v-text-field
                  dense
                  solo
                  v-model="input.username"
                  :rules="nameRules"
                  :counter="15"
                  required
                ></v-text-field>
              </v-col>

              <v-col
                cols="12"
                class="py-0"
              >
                <div class="pb-1">
                  Password
                </div>
                <v-text-field
                  dense
                  solo
                  v-model="input.password"
                  :rules="passwordRules"
                  type="password"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12" class="py-0 mt-n6">
                <v-checkbox
                  v-model="checkbox"
                  label="Remeber me"
                ></v-checkbox>
              </v-col>

              <v-col
                align="center"
                cols="12"
              >
                <v-btn
                  block
                  color="blue"
                  class="white--text"
                  @click="login()"
                >
                  login
                </v-btn>
              </v-col>
              <v-col
                align="center"
                cols="12"
              >
                <v-btn
                  block
                  color="blue"
                  class="white--text"
                  @click="register()"
                >
                  register
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
        <template v-else>
          <div class="pa-2 text-center">
            <div class="text-h5 font-weight-medium text-center text-uppercase py-3">
              welcome {{input.username}}
            </div>
            <div class="text-body-1 text-center text- py-2">
              Please select the company you want to access
            </div>
            <v-select
              :items="input.companies"
              dense
              solo
            >
            </v-select>
            <v-btn
              block
              color="blue"
              class="white--text"
              @click="companiesLogin()"
            >
              continue
            </v-btn>
          </div>
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';
export default {
  
  name: 'Login',

  data: () => ({
      API_URL: 'http://localhost:5290/api/',
      authenticated: false,
      valid: false,
      input: {
        username: "",
        password: "",
        companies:[],
      },
      nameRules: [
        v => !!v || 'Username is required',
        v => v.length <= 15 || 'Username must be less than 15 characters',
      ],
      passwordRules: [
        v => !!v || 'Password is required',
      ],
      checkbox: false,
      users:[],
    }),

    methods: {
      refreshData(){
        axios.get("http://localhost:5290/api/users")
        .then((Response)=>{
          this.users=Response.data;
          console.log(this.users);
        });
      },

      login() {
        if(this.input.username != "" && this.input.password != "") {
            this.users.some(user => {
              if(user.userName === this.input.username && user.password === this.input.password){
                this.authenticated = true;
              }
            }) 
        } else {
          console.log("A username and password must be present");
        }
      },

      companiesLogin(){
        this.$emit("authenticated", true);
        this.$router.replace({ name: "home" });
      },

      register(){
        this.$router.push('/register')
      }
    },

    mounted(){
      this.refreshData()
    }
}
</script>