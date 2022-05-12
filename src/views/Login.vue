<template>
  <v-container fluid class="grey lighten-3">
    <v-row justify="center" align="center" style="height:100vh">
      <v-col cols="4" class="white rounded-lg">
        <v-form v-model="valid">
          <v-container fluid>
            <v-row>
              <v-col
                cols="12"
              >
                <div class="pb-1">
                  First name
                </div>
                <v-text-field
                  dense
                  solo
                  v-model="username"
                  :rules="nameRules"
                  :counter="15"
                  required
                ></v-text-field>
              </v-col>

              <v-col
                cols="12"
              >
                <div class="pb-1">
                  Password
                </div>
                <v-text-field
                  dense
                  solo
                  v-model="password"
                  :rules="passwordRules"
                  type="password"
                  required
                ></v-text-field>
              </v-col>

              <v-col
                align="center"
                cols="6"
              >
                <v-btn
                  color="blue"
                  class="white--text"
                >
                  login
                </v-btn>
              </v-col>
              <v-col
                align="center"
                cols="6"
              >
                <v-btn
                  color="blue"
                  class="white--text"
                >
                  register
                </v-btn>
              </v-col>
              <v-col cols="12">
              </v-col>
            </v-row>
            <v-checkbox
              v-model="checkbox"
              label="John"
              value="John"
            ></v-checkbox>
          </v-container>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
      valid: false,
      username: '',
      nameRules: [
        v => !!v || 'Username is required',
        v => v.length <= 10 || 'Username must be less than 15 characters',
      ],
      password: '',
      passwordRules: [
        v => !!v || 'Password is required',
      ],
      checkbox: false,
    }),
}
</script>