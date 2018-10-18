<template>
  <div>
  <modal name="delete-stuff" :height="100" :pivotY="0.15">
    <div class="content">
      <strong class="title">
        This will delete all completed tasks & projects, are you sure?
      </strong>
      <div class="row">
        <button class="btn btn-default inpBtn" @click="cancel">Cancel</button>
        <button class="btn btn-fill btn-danger inpBtn" @click="destroy">Delete</button>
      </div>
    </div>
  </modal>
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
          <li><router-link to="/shortcuts">Shortcuts</router-link></li>
        </ul>
      </div>
    </div>
    <div class="row">
      <button class="btn btn-fill btn-info inpBtn" @click="signout">Sign Out</button>
    </div>
    <div class="row">
      <button class="btn btn-fill btn-danger inpBtn" @click="show">Delete Completed</button>
    </div>
  </div>
</template>
<script>
  import UserCard from '@/components/Dashboard/Views/UserProfile/UserCard.vue'
  export default {
    components: {
      UserCard
    },
    methods: {
      signout () {
        this.$store.dispatch('signOut')
      },
      show () {
        this.$modal.show('delete-stuff')
      },
      destroy () {
        this.$store.dispatch('deleteCompletedTasksAndProjects')
        this.$modal.hide('delete-stuff')
      },
      cancel () {
        this.$modal.hide('delete-stuff')
      }
    }
  }

</script>
<style scoped>
  .content {
    padding: 20px;
  }
</style>
