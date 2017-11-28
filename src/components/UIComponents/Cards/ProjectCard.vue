<template>
  <div class="card">
    <div class="header">
      <h4 class="title">{{project.name}}</h4>
      <p class="category">
        <span>{{id}}</span>
        <span>{{project.description}}</span>
      </p>
    </div>
    <div class="content">
      <div class="footer">
        <hr>
        <div class="stats">
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
      project: Object,
      id: String
    },
    computed: {
      numTasks () {
        return this.$store.getters.numTasksInProject(this.id)
      }
    }
  }

</script>
<style>

</style>
