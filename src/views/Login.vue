<template>
  <v-container fluid class="grey lighten-3">
    <v-row justify="center" align="center" style="height:100vh">
      <v-col cols="4" class="white rounded-lg">
        <v-form v-model="valid">
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
                >
                  register
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  
  name: 'Login',
  
  props:['user'],

  data: () => ({
      valid: false,
      input: {
        username: "",
        password: ""
      },
      nameRules: [
        v => !!v || 'Username is required',
        v => v.length <= 15 || 'Username must be less than 15 characters',
      ],
      passwordRules: [
        v => !!v || 'Password is required',
      ],
      checkbox: false,
    }),

    methods: {
      login() {
        if(this.input.username != "" && this.input.password != "") {
            if(this.input.username == this.user.username && this.input.password == this.user.password) {
                this.$emit("authenticated", true);
                this.$router.replace({ name: "home" });
            } else {
                console.log("The username and / or password is incorrect");
            }
        } else {
            console.log("A username and password must be present");
        }
      }
    }
}
</script>