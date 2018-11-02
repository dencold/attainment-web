<template>
  <div>
    <vim-movement
      :sectionLens="sectionLens"
      :currSection="0"
      :currIndex="currFocusIndex"
      @focusChange="handleMovement">
    </vim-movement>
    <project-card-shortcuts :id="currFocusId"></project-card-shortcuts>

    <text-input
      placeholder="Add a project"
      @submitted="addProject"
      :focused.sync="isInputFocused">
    </text-input>

    <div class="projects">
      <project-card v-for="(id, index) in projectsActive" :key="id"
        :id="id"
        @click.native="toProject(id)"
        :isFocused="isFocused(index)"
        @mouseover.native="updateFocus(index)">
      </project-card>
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
  import VimMovement from '@/components/UIComponents/Inputs/VimMovement.vue'
  import ProjectCardShortcuts from '@/components/UIComponents/Inputs/ProjectCardShortcuts.vue'

  export default {
    components: {
      'project-card': ProjectCard,
      'text-input': TextInput,
      'vim-movement': VimMovement,
      'project-card-shortcuts': ProjectCardShortcuts
    },

    data () {
      return {
        currFocusIndex: null,
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
      },
      sectionLens () {
        return [this.projectsActive.length]
      },
      currFocusId () {
        if (this.currFocusIndex === null) {
          return null
        }

        return this.projectsActive[this.currFocusIndex]
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
      },
      handleMovement (e) {
        this.updateFocus(e.index)
      },
      updateFocus (index) {
        this.currFocusIndex = index
        this.isInputFocused = false
      },
      isFocused (index) {
        return this.currFocusIndex === index
      }
    }
  }

</script>
<style scoped>
  .projects {
    display: grid;
    grid-template-columns: repeat(3, 350px);
    grid-gap: 10px;
  }
</style>
