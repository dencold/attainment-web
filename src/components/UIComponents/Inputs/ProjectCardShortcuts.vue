<template>
  <div></div>
</template>

<script>
  export default {
    props: {
      id: String
    },

    computed: {
      project () {
        return this.$store.state.projects[this.id]
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
          this.toProject(this.id)
        } else if (e.key === 's') {
          this.toggleStar()
        }
      },
      toProject (projId) {
        this.$router.push({name: 'project', params: { id: projId }})
      },
      toggleStar () {
        let newProj = this.project
        newProj.starred = !this.project.starred
        this.$store.dispatch(
          'updateProject',
          {id: this.id, newProj: newProj}
        )
      }
    }
  }
</script>
