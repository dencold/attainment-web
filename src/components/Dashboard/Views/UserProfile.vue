<template>
  <div>
    <div class="row">
      <div class="col-lg-8 col-md-7">
        <user-card>

        </user-card>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-8 col-md-7">
        <ul>
          <li><router-link to="/table-list">Table List</router-link></li>
          <li><router-link to="/typography">Typography</router-link></li>
          <li><router-link to="/icons">Icons</router-link></li>
          <li><router-link to="/maps">Maps</router-link></li>
          <li><router-link to="/notifications">Notifications</router-link></li>
        </ul>
      </div>
    </div>
    <div class="row">
      <button class="btn btn-fill btn-info inpBtn" @click="signout">Sign Out</button>
    </div>
  </div>
</template>
<script>
  import UserCard from './UserProfile/UserCard.vue'
  export default {
    components: {
      UserCard
    },
    methods: {
      signout () {
        this.$store.dispatch('signOut')
      }
    }
  }

</script>
<style>

</style>
