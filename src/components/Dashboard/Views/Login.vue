<!-- 
  learned technique from this helpful source:
  https://github.com/CaptainYouz/vue-firebase-tutorial/blob/master/src/components/Login.vue
-->

<template>
  <div class="login">
    <img
      src="/img/attain-logo.jpg"
      height="500px"
      width="500px"
    />
    <h3>Welcome</h3>

    <div v-if="!$store.getters.isLoggedIn">
      <button class="btn btn-fill btn-info btn-wd" @click="signIn">Login With Google</button>
    </div>
    <div v-if="$store.getters.isLoggedIn">
      <button class="btn btn-fill btn-info btn-wd" @click="signOut">Logout</button>
    </div>

  </div>
</template>

<script>
  import firebase from 'firebase'

  export default {
    name: 'login',

    methods: {
      signIn: function () {
        const provider = new firebase.auth.GoogleAuthProvider()

        firebase.auth().signInWithRedirect(provider)
        // we handle the aftermath of the signin flow on App.vue's beforeCreate hook
      },
      signOut: function () {
        this.$store.dispatch('signOut')
      }
    }
  }
</script>

<style scoped>
  .login {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
