<template>
  <div class="container">
    <div>
      <div class="title neon flick">{{ error.statusCode }}</div>
      <div class="subtitle neon flick">{{ error.message }}</div>
      <v-btn to="/" class="neubtn mt-10 neon"> Home page </v-btn>
      <br />
      <v-btn class="neubtn my-2 neon" @click="$store.commit('current/logout')"> Logout </v-btn>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  props: { error: { type: Object, default: null } },
  head() {
    switch (this.error.statusCode) {
      case 401:
        this.title = 'Auth Error'
        break
      case 404:
        this.title = '404 Not Found'
        break
      case 500:
        this.title = 'Internal Server Error'
        break
      default:
        this.title = 'An Error Occured'
        break
    }
    const title = this.title
    return { title }
  }
})
</script>

<style scoped>
.container {
  min-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.title {
  font-family: -apple-system, BlinkMacSystemFont, Roboto, Arial, sans-serif;
  font-size: 10rem !important;
  line-height: 10rem !important;
}
.subtitle {
  font-size: 3rem;
  padding-bottom: 1rem;
}
.neon {
  --neon: #0fa;
  font-weight: lighter;
  color: var(--light);
  text-shadow: 0 0 3px #fff, 0 0 5px #fff, 0 0 10px #fff, 0 0 20px var(--neon), 0 0 40px var(--neon), 0 0 45px var(--neon),
    0 0 100px var(--neon), 0 0 75px var(--neon);
}
.flick {
  animation: flicker 3s infinite alternate;
}
@keyframes flicker {
  0%,
  18%,
  22%,
  25%,
  53%,
  57%,
  100% {
    text-shadow: 0 0 3px #fff, 0 0 5px #fff, 0 0 10px #fff, 0 0 20px var(--neon), 0 0 40px var(--neon), 0 0 45px var(--neon),
      0 0 100px var(--neon), 0 0 75px var(--neon);
  }
  20%,
  24%,
  55% {
    text-shadow: none;
  }
}
.neubtn {
  background-color: #121212 !important;
  --radius: 20px;
  --x: calc(var(--radius) / 4);
  --y: calc(var(--radius) / 2);
  border-radius: var(--radius);
  background: linear-gradient(145deg, #131313, #101010);
  box-shadow: var(--x) var(--x) var(--y) #0f0f0f, var(--x) var(--x) var(--y) #151515;
}
</style>
