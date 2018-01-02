<template>
  <div class="flex-row highlight pointer" >
    <div class="icon" @click="clickAction">
      <i class="ti-folder"></i>
    </div>
    <span class="name" @click="clickAction">{{name}}</span>
    <button class="btn btn-fill btn-info inpBtn" @click="openSearch">+</button>
    <global-search v-show="showSearch" @search-result="moveProject" search-category="projects">
    </global-search>
  </div>
</template>

<script>
  import GlobalSearch from 'components/UIComponents/GlobalSearch.vue'

  export default {
    components: {
      'global-search': GlobalSearch
    },

    props: {
      projectId: String
    },

    data () {
      return {
        showSearch: false
      }
    },

    computed: {
      project () {
        if (this.projectId) {
          return this.$store.state.projects[this.projectId]
        }

        return null
      },
      name () {
        if (this.project) {
          return this.project.name
        }

        return 'Move to project'
      }
    },

    methods: {
      clickAction () {
        if (this.projectId) {
          this.jumpToProj()
        }

        this.openSearch()
      },
      jumpToProj () {
        if (this.projectId) {
          this.$router.push({name: 'project', params: { id: this.projectId }})
        }
      },
      openSearch () {
        this.showSearch = true
      },
      closeSearch () {
        this.showSearch = false
      },
      moveProject (project) {
        this.$emit('change-project', project)
        this.closeSearch()
      }
    }
  }

</script>
<style scoped>
  .flex-row {
    display: flex;
    flex-direction: row;
  }
  .inpBtn {
    padding: 1px 5px;
  }
  .pointer {
    cursor: pointer;
  }
  .highlight {
    color: #3091B2;
  }
  .flex-row {
    display: flex;
    flex-direction: row;
    padding: 0 15px;
    margin: 0 0 5px 0;
  }
  .fa {
    width: auto;
  }
  .name {
    padding: 0 10px;
  }
</style>
