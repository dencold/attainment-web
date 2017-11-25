<!-- 
  learned technique from this helpful source:
  https://github.com/CaptainYouz/vue-firebase-tutorial/blob/master/src/components/Login.vue
-->

<template>
  <div class="login">
    <div v-if="!$store.getters.isLoggedIn">
      <h3>Login With Google Now!</h3>
      <button color="primary" @click="signIn">Login</button>
    </div>
    <div v-if="$store.getters.isLoggedIn">
      <button color="primary" @click="signOut">Log out</button>
    </div>
  </div>
</template>

<script>
  import firebase from 'firebase'

  export default {
    name: 'login',

    methods: {
      signIn: function () {
        console.log('IN SIGNIN!')
        const provider = new firebase.auth.GoogleAuthProvider()

        firebase.auth().signInWithRedirect(provider)
          .then((result) => {
            console.log('after redirect!')
            this.$store.commit('SET_USER', result.user)
            this.$router.replace({name: 'overview'})
          })
          .catch(err => {
            console.log('YEPPPERS!!!')
            console.log(err)
          })
      },
      signOut: function () {
        this.$store.dispatch('signOut')
      }
    }
  }
</script>

<style scoped>
  .icon {
    cursor: pointer;
  }
</style>
