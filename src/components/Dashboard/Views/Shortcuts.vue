<template>
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <paper-table type="hover" :title="taskTable.title" :data="taskTable.data" :columns="taskTable.columns">
          </paper-table>
        </div>
      </div>

      <div class="col-md-12">
        <div class="card">
          <paper-table type="hover" :title="globalTable.title" :data="globalTable.data" :columns="globalTable.columns">
          </paper-table>
        </div>
      </div>
    </div>
</template>
<script>
  import PaperTable from 'components/UIComponents/PaperTable.vue'
  const columns = ['Key', 'Description']
  const globalShortcuts = [
    { key: 'P', description: 'Jump to projects' },
    { key: 'T', description: 'Jump to tasks' },
    { key: 'D', description: 'Jump to dashboard' },
    { key: '1', description: 'Jump to now' },
    { key: '2', description: 'Jump to plan' },
    { key: '3', description: 'Jump to inbox' },
    { key: '/', description: 'Open global search' },
    { key: '<', description: 'Jump back' },
    { key: '>', description: 'Jump forward' },
    { key: '?', description: 'Jump to the shortcuts help page' }
  ]

  const taskShortcuts = [
    { key: 's', description: 'Toggle star' },
    { key: 'o', description: 'Open task' },
    { key: 'c', description: 'Complete task' },
    { key: 'd', description: 'Open due date picker' },
    { key: 'e', description: 'Edit task name' },
    { key: 'n', description: 'Edit notes' },
    { key: 'm', description: 'Move task to project' },
    { key: 'a', description: 'Add to the action count' },
    { key: 'A', description: 'Add to the total actions required' },
    { key: 'b', description: 'Move to backlog' },
    { key: 'z', description: 'Set default snooze (5 days)' },
    { key: 'Z', description: 'Open snooze date picker' },
    { key: '!', description: 'Set now task' },
    { key: 't', description: 'Toggle as today task' }
  ]

  export default {
    components: {
      PaperTable
    },
    data () {
      return {
        globalTable: {
          title: 'Global Shortcuts',
          columns: [...columns],
          data: [...globalShortcuts]
        },
        taskTable: {
          title: 'Task Shortcuts',
          columns: [...columns],
          data: [...taskShortcuts]
        }
      }
    }
  }

</script>
<style>

</style>
