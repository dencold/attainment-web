<template>
  <div>
    <input 
      type="text"
      ref="searchinput"
      :value="searchQry"
      @input="filter" 
      placeholder="Search"
      @keyup.enter="toTopHit"
      @keyup.esc="$refs.searchinput.blur()"
      @keyup.stop
    >
    <ul>
      <li v-for="project in filtered" @click="toProject(project.id)">
        {{project.name}}
      </li>
    </ul>
  </div>
</template>
<script>
  import Fuse from 'fuse.js'

  export default{
    computed: {
      projects () {
        return this.$store.getters.projectsAsArray
      },
      fuse () {
        var options = {
          keys: ['name']
        }

        return new Fuse(this.projects, options)
      }
    },
    data () {
      return {
        searchQry: '',
        filtered: []
      }
    },
    methods: {
      filter (e) {
        this.searchQry = e.target.value
        this.filtered = this.fuse.search(e.target.value)
      },
      toProject (projectId) {
        this.$router.push({name: 'project', params: { id: projectId }})
        this.searchQry = ''
        this.filtered = []
      },
      toTopHit () {
        if (this.filtered && this.filtered.length > 0) {
          this.toProject(this.filtered[0].id)
        }
      }
    }
  }
</script>
