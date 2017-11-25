<!-- 
  learned technique from this helpful source:
  https://github.com/CaptainYouz/vue-firebase-tutorial/blob/master/src/components/Login.vue
-->

<template>
  <div class="login">
    <img
      src="/static/img/attain-logo.jpg"
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
  .login {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
