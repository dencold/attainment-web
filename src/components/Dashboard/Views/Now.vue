<template>
  <task-detail :id="nowId"></task-detail>
</template>

<script>
  import TaskDetail from 'components/Dashboard/Views/TaskDetail.vue'

  export default {
    components: {
      'task-detail': TaskDetail
    },

    computed: {
      nowId () {
        return this.$store.getters.nowTask
      }
    }

  }
</script>
