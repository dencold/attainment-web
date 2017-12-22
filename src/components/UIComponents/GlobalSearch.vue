<template>
  <div>
    <input 
      type="text"
      ref="searchinput"
      :value="searchQry"
      @input="filter" 
      placeholder="Search"
      @keyup.enter="jumpToTopHit"
      @keyup.esc="$refs.searchinput.blur()"
      @keyup.stop
    >
    <!--
      [dc] wow...autocomplete dropdown options really suck even in 2017 :*(
      html5 included datalist (below) to help this, but browser support is pretty bad
      and completely unsupported by safari, so iPhones are out :(
      I'm settling with a <ul> approach for now. it should work everywhere, it just
      needs some additional implementation for tab/arrow access from keyboard. can
      be done at a later date as it's not super high priority.

    <datalist id="projs" ref="datals">
      <option v-for="project in filtered" :data-id="project.id" @click="toProject(project.id)">{{project.name}}</option>
    </datalist>
    -->
    <ul>
      <li v-for="item in filtered" @click="jumpTo(item)">
        {{item.name}}
      </li>
    </ul>
  </div>
</template>
<script>
  import Fuse from 'fuse.js'

  export default{
    computed: {
      projects () {
        return this.$store.getters.searchItems
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
      resetSearch () {
        this.searchQry = ''
        this.filtered = []
      },
      jumpTo (item) {
        if (item && item.type === 'project') {
          this.$router.push({name: 'project', params: { id: item.id }})
          this.resetSearch()
        } else if (item && item.type === 'task') {
          this.$router.push({name: 'task', params: { id: item.id }})
          this.resetSearch()
        } else {
          console.log('ERROR: Could not determine type')
        }
      },
      jumpToTopHit () {
        if (this.filtered && this.filtered.length > 0) {
          this.jumpTo(this.filtered[0])
        }
      }
    }
  }
</script>
<style scoped>
  li:focus {
    background-color: #edf8ff;
  }
  li:hover {
    background-color: #edf8ff;
  }
</style>
