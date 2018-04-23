<template>
  <modal name="move-task" height="auto" :pivotY="0.15">
    <div class="content">
      <strong class="title">
        Move Task To Project
      </strong>
      <global-search
        ref="globalsearch"
        @search-result="moveProject"
        search-category="projects">
      </global-search>
      <button class="btn btn-fill btn-info inpBtn" @click="moveProject">Move</button>
      <button class="btn btn-fill btn-info inpBtn" @click="moveProject">Create</button>
    </div>
  </modal>
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

    mounted () {
      // this.$refs.globalsearch.focus()
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
      moveProject (project) {
        this.$emit('change-project', project)
        this.$modal.hide('move-task')
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
