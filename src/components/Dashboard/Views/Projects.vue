<template>
  <div>
    <text-input placeholder="Add a project" @submitted="addProject"></text-input>

    <!--Stats cards-->
    <div class="row">
      <div class="col-lg-3 col-sm-6" v-for="(project, id) in $store.state.projects">
        <project-card :id="id" :project="project" @click.native="toProject(id)"></project-card>
      </div>
    </div>

  </div>
</template>
<script>
  import ProjectCard from 'components/UIComponents/Cards/ProjectCard.vue'
  import TextInput from 'components/UIComponents/Inputs/TextInput.vue'

  export default {
    components: {
      'project-card': ProjectCard,
      'text-input': TextInput
    },

    methods: {
      addProject (e) {
        const projectName = e.trim()

        if (projectName.length === 0) {
          console.log('ERROR! Please specify a project name')
        } else {
          const newPrj = {
            name: projectName,
            notes: '',
            completed: false
          }
          this.$store.dispatch('addProject', newPrj)
        }
      },
      toProject: function (projectId) {
        this.$router.push({name: 'project', params: { id: projectId }})
      }
    }
  }

</script>
<style>

</style>
