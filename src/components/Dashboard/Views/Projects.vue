<template>
  <div>
    <text-input placeholder="Add a project" @submitted="addProject"></text-input>

    <div class="flex-col" v-for="(project, id) in projectsActive">
      <project-card :id="id" :project="project" @click.native="toProject(id)"></project-card>
    </div>

    <h6 class="pointer" v-if="Object.keys(projectsCompleted).length > 0" @click="toggleShowCompleted">Completed Projects</h6>

    <div class="flex-col" v-show="showCompleted" v-for="(project, id) in projectsCompleted">
      <project-card :id="id" :project="project" @click.native="toProject(id)"></project-card>
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

    data () {
      return {
        showCompleted: false
      }
    },

    computed: {
      projectsActive () {
        return this.$store.getters.projectsActive
      },
      projectsCompleted () {
        return this.$store.getters.projectsCompleted
      }
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
      },
      toggleShowCompleted () {
        this.showCompleted = !this.showCompleted
      }
    }
  }

</script>
<style>

</style>
