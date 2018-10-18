<template>
  <div class="card pointer">
    <div class="header">
      <h4 class="title">{{project.name}}</h4>
      <p class="category">
        <span>{{project.description}}</span>
      </p>
    </div>
    <div class="content">
      <div class="footer">
        <hr>
        <div class="stats">
          <i class="ti-angle-double-right"></i>
          <span>{{numTasks}}</span>
        </div>
        <div class="pull-right"></div>
      </div>
    </div>

  </div>
</template>
<script>
  export default {
    name: 'project-card',
    props: {
      id: String
    },
    computed: {
      numTasks () {
        return this.$store.getters.numTasksInProject(this.id)
      },
      project () {
        if (this.id) {
          return this.$store.state.projects[this.id]
        }

        return null
      }
    }
  }

</script>
<style scoped>
  .pointer {
    cursor: pointer;
  }
</style>
