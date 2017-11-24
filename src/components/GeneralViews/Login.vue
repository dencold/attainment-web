<!-- 
  learned technique from this helpful source:
  https://github.com/CaptainYouz/vue-firebase-tutorial/blob/master/src/components/Login.vue
-->

<template>
  <div class="login">
    <h3>Login With Google</h3>
    <button color="primary" @click="signIn">Login</button>
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

        firebase.auth().signInWithPopup(provider)
          .then((result) => {
            console.log('after redirect!')
            this.$store.commit('updateUser', result.user)
            this.$router.replace({name: 'overview'})
          })
          .catch(err => {
            console.log('YEPPPERS!!!')
            console.log(err)
          })
      },
      signOut: function () {
        firebase.auth().signOut()
          .then(() => {
            this.user = null
          }).catch(err => console.log(err))
      }
    }
  }
</script>

<style scoped>
  .icon {
    cursor: pointer;
  }
</style>
