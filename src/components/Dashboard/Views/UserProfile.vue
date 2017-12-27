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
  </div>
</template>
<script>
  import EditProfileForm from './UserProfile/EditProfileForm.vue'
  import UserCard from './UserProfile/UserCard.vue'
  import MembersCard from './UserProfile/MembersCard.vue'
  export default {
    components: {
      EditProfileForm,
      UserCard,
      MembersCard
    }
  }

</script>
<style>

</style>
