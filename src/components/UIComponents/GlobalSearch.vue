<template>
  <div>
    <input
      type="text"
      ref="searchinput"
      :value="searchQry"
      @input="filter"
      placeholder="Search"
      @keyup.enter="selectTopHit"
      @keyup.esc="handleEsc"
      @keypress.stop
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
      <li v-for="(item, index) in filtered" @click="select(item)" @mousedown="disable" :key="index">
        {{item.name}}
      </li>
    </ul>
  </div>
</template>
<script>
  import Fuse from 'fuse.js'

  export default{
    computed: {
      items () {
        return this.$store.getters.searchItems(this.searchCategory)
      },
      fuse () {
        var options = {
          keys: ['name']
        }

        return new Fuse(this.items, options)
      }
    },
    data () {
      return {
        searchQry: '',
        filtered: []
      }
    },
    props: {
      searchCategory: {
        default: 'all',
        type: String
      },
      queryText: {
        default: 'all',
        type: String
      }
    },
    methods: {
      filter (e) {
        this.searchQry = e.target.value
        this.filtered = this.fuse.search(e.target.value)
        this.$emit('query-change', this.searchQry)
      },
      select (item) {
        this.$emit('search-result', item)
        this.clear()
        this.$refs.searchinput.blur()
      },
      selectTopHit () {
        if (this.filtered && this.filtered.length > 0) {
          this.select(this.filtered[0])
        }
      },
      focus () {
        this.$refs.searchinput.focus()
      },
      handleEsc () {
        this.clear()
        this.$refs.searchinput.blur()
        this.$emit('esc')
      },
      clear () {
        this.searchQry = ''
        this.filtered = []
      },
      disable (e) {
        // we have to do this for mousedown because it leads to a blur
        // event being emmitted which happens before the click event and
        // we end up never getting to select the list element
        e.preventDefault()
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
