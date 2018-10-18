<template>
  <div>
    <text-input
      placeholder="Add a project"
      @submitted="addProject"
      :focused.sync="isInputFocused">
    </text-input>

    <div class="flex-col" v-for="id in projectsActive" :key="id">
      <project-card :id="id" @click.native="toProject(id)"></project-card>
    </div>

    <h6 class="pointer" v-if="projectsCompleted.length > 0" @click="toggleShowCompleted">Completed Projects</h6>

    <div class="flex-col" v-show="showCompleted" v-for="id in projectsCompleted" :key="id">
      <project-card :id="id" @click.native="toProject(id)"></project-card>
    </div>

  </div>
</template>
<script>
  import ProjectCard from '@/components/UIComponents/Cards/ProjectCard.vue'
  import TextInput from '@/components/UIComponents/Inputs/TextInput.vue'

  export default {
    components: {
      'project-card': ProjectCard,
      'text-input': TextInput
    },

    data () {
      return {
        showCompleted: false,
        isInputFocused: true
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
        this.$store.dispatch('addProject', e)
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
