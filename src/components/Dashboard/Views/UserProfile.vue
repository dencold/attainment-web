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
          <li><a href="/table-list">Table List</a></li>
          <li><a href="/typography">Typography</a></li>
          <li><a href="/icons">Icons</a></li>
          <li><a href="/maps">Maps</a></li>
          <li><a href="/notifications">Notifications</a></li>
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
