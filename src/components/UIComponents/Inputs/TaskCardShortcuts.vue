<template>
  <general-shortcuts :id="id"></general-shortcuts>
</template>

<script>
  import GeneralTaskShortcuts from '@/components/UIComponents/Inputs/GeneralTaskShortcuts.vue'

  export default {
    components: {
      'general-shortcuts': GeneralTaskShortcuts
    },

    props: {
      id: String
    },

    computed: {
      task () {
        return this.$store.state.tasks[this.id]
      }
    },

    created () {
      document.addEventListener('keyup', this.handleKeyUp)
    },

    destroyed () {
      document.removeEventListener('keyup', this.handleKeyUp)
    },

    methods: {
      handleKeyUp (e) {
        if (e.key === 'o') {
          this.toTask(this.id)
        }
      },
      toTask (taskId) {
        this.$router.push({name: 'task', params: { id: taskId }})
      }
    }
  }
</script>
