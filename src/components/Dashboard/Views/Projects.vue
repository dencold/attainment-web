<template>
  <div>

    <!--Stats cards-->
    <div class="row">
      <div class="col-lg-3 col-sm-6" v-for="project in $store.state.projects">
        <project-card :project="project" @click="alert('blah')"></project-card>
      </div>
    </div>

  </div>
</template>
<script>
  import ProjectCard from 'components/UIComponents/Cards/ProjectCard.vue'
  export default {
    components: {
      ProjectCard
    },

    methods: {
      change: function () {
        console.log('CHANGE!')
        this.$store.commit('updateUser', {first: 'Finnegan'})
      }
    }
  }

</script>
<style>

</style>
