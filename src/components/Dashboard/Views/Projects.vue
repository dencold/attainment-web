<template>
  <div>
    <input
      name="addProject"
      ref="addProject"
      v-model.trim="projectName"
      placeholder="Add a new project"
      @keyup.enter="addProject()"
      @keyup.esc="$refs.addProject.blur()"
    />
    <button @click="addProject">+</button>

    <!--Stats cards-->
    <div class="row">
      <div class="col-lg-3 col-sm-6" v-for="project in $store.state.projects">
        <project-card :project="project" @click="console.log('blah')"></project-card>
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

    data () {
      return {
        projectName: ''
      }
    },

    methods: {
      addProject () {
        if (this.projectName.trim().length === 0) {
          console.log('ERROR!')
        } else {
          const newPrj = {name: this.projectName, description: ''}
          this.$store.dispatch('addProject', newPrj)
          this.projectName = ''
        }
      }
    }
  }

</script>
<style>

</style>
