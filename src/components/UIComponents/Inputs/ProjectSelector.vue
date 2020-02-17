<template>
  <modal name="move-task" height="auto" :pivotY="0.15" @opened="onOpen">
    <div class="content">
      <strong class="title">
        Move Task To Project
      </strong>
      <global-search
        ref="globalsearch"
        @search-result="changeProject"
        @query-change="onQueryChange"
        @esc="$modal.hide('move-task')"
        search-category="projects">
      </global-search>
      <button class="btn btn-fill btn-info inpBtn">Move</button>
      <button class="btn btn-fill btn-info inpBtn" @click="createProject">Create</button>
    </div>
  </modal>
</template>

<script>
  import GlobalSearch from '@/components/UIComponents/GlobalSearch.vue'

  export default {
    components: {
      'global-search': GlobalSearch
    },

    props: {
      taskId: String
    },

    computed: {
      task () {
        return this.$store.state.tasks[this.taskId]
      }
    },

    data () {
      return {
        queryInput: ''
      }
    },

    methods: {
      changeProject (project) {
        let newTask = this.task
        newTask.projectId = project.id
        this.updateTask(newTask)
        this.$modal.hide('move-task')
      },
      onOpen () {
        this.$refs.globalsearch.focus()
      },
      onQueryChange (query) {
        this.queryInput = query
      },
      updateTask (newTask) {
        this.$store.dispatch(
          'updateTask',
          {id: this.taskId, newTask: newTask}
        )
      },
      createProject () {
        this.$store.dispatch(
          'addProjectAndSetTask',
          {projectName: this.queryInput, taskId: this.taskId, task: this.task}
        )
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
