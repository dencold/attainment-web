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
  // note this is just the display of all shortcuts available to the user and is
  // what is shown when the '?' key is pressed. the actual shortcuts are defined here:
  // - global: App.vue
  // - task specific:
  //    - componenents/UIComponents/Inputs/GeneralTaskShortcuts.vue
  //    - componenents/Dashboard/Views/TaskDetail.vue
  // - task card specific: components/UIComponents/Inputs/TaskCardShortcuts.vue

  import PaperTable from '@/components/UIComponents/PaperTable.vue'
  const columns = ['Key', 'Description']
  const globalShortcuts = [
    { key: 'A', description: 'Jump to quick add task' },
    { key: 'D', description: 'Jump to dashboard' },
    { key: 'P', description: 'Jump to projects' },
    { key: 'T', description: 'Jump to tasks' },
    { key: 'W', description: 'Jump to weekend' },
    { key: '1', description: 'Jump to now' },
    { key: '2', description: 'Jump to plan' },
    { key: '3', description: 'Jump to inbox' },
    { key: '/', description: 'Open global search' },
    { key: '<', description: 'Jump back' },
    { key: '>', description: 'Jump forward' },
    { key: '?', description: 'Jump to the shortcuts help page' }
  ]

  const taskShortcuts = [
    // GeneralTaskShortcuts
    { key: '!', description: 'Set now task' },
    { key: 'b', description: 'Move to backlog' },
    { key: 'e', description: 'Complete task' },
    { key: 'i', description: 'Cycle task size' },
    { key: 'p', description: 'Jump to task\'s project' },
    { key: 's', description: 'Toggle star' },
    { key: 't', description: 'Toggle as today task' },
    { key: 'w', description: 'Toggle as weekend task' },
    { key: 'z', description: 'Set default snooze (7 days)' },
    // TaskDetail
    { key: 'd', description: 'Open due date picker' },
    { key: 'n', description: 'Edit notes' },
    { key: 'r', description: 'Rename task' },
    { key: 'v', description: 'Move task to project' },
    { key: 'Z', description: 'Open snooze date picker' },
    // TaskCardShortcuts
    { key: 'o', description: 'Open task' }
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
