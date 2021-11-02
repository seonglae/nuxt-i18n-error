<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-24">
          <v-toolbar dark flat>
            <v-toolbar-title>Account</v-toolbar-title>
          </v-toolbar>
          <v-slide-y-transition mode="in-out">
            <v-toolbar v-if="error" height="dense" dark flat color="red">
              <v-toolbar-title>Login Fail</v-toolbar-title>
            </v-toolbar>
          </v-slide-y-transition>

          <v-card-text>
            <v-form>
              <v-text-field
                v-model="email"
                autofocus
                label="Email"
                name="email"
                prepend-icon="mdi-account"
                type="text"
              />
              <v-text-field
                v-model="password"
                label="Password"
                name="password"
                prepend-icon="mdi-lock"
                type="password"
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn @click="$router.push(`/signup`)"> SIGNUP </v-btn>
            <v-btn color="primary" @click="onSubmit(email, password)">
              Login
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ts-check
import { defineComponent, reactive, toRefs } from '@vue/composition-api'

export default defineComponent({
  name: 'Login',
  layout: 'before',
  middleware: 'authentication',
  setup() {
    // Datas
    const state = reactive({
      error: false,
      email: null,
      password: null
    })

    // Logins
    const onSubmit = async () => {}
    return { onSubmit, ...toRefs(state) }
  }
})
</script>
