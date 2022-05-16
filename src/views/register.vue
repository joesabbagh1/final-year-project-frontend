<template>
  <v-container fluid class="grey lighten-3">
    <v-row justify="center" align="center" style="height:100vh">
      <v-col cols="4" class="white rounded-lg">
        <v-form v-model="valid">
          <v-container fluid>
            <v-row justify="center">
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
                  Email
                </div>
                <v-text-field
                  dense
                  solo
                  v-model="input.email"
                  :rules="emailRules"
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

              <v-col
                cols="12"
                class="py-0"
              >
                <div class="pb-1">
                  Comfirm Password
                </div>
                <v-text-field
                  dense
                  solo
                  v-model="input.comfirmPassword"
                  :rules="confirmPasswordRules.concat(passwordConfirmationRule)"
                  type="password"
                  required
                ></v-text-field>
              </v-col>
              
              <v-col
                align="center"
                cols="5"
              >
                <v-btn
                  block
                  :disabled="!valid"
                  color="blue"
                  class="white--text"
                  @click="register()"
                >
                  register
                </v-btn>
              </v-col>
              <v-col
                align="center"
                cols="5"
              >
                <v-btn
                  block
                  color="white"
                  @click="cancel()"
                >
                  cancel
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
import router from '@/router'
export default {
  
  name: 'Login',
  
  props:['user'],

  data: () => ({
      valid: false,
      input: {
        username: '',
        email: '',
        password: '',
        comfirmPassword: '',
      },
      nameRules: [
        v => !!v || 'Username is required',
        v => v.length <= 15 || 'Username must be less than 15 characters',
      ],
      emailRules: [
        v => !!v || 'Email is required',
        value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        },
      ],
      passwordRules: [
        v => !!v || 'Password is required',
      ],
      confirmPasswordRules: [
        v => !!v || "Password is required"
      ],
      checkbox: false,
    }),

    methods: {
      register(){
        this.$router.push('/login')
      },
      cancel(){
        this.$router.push('/login')
      }
    },

    computed: {
      passwordConfirmationRule() {
        return () =>
          this.input.password === this.input.comfirmPassword || "Password must match"
      }
    }
}
</script>