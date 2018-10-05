<template>
  <modal name="add-task" height="auto" :pivotY="0.15">
    <div class="content">
      <strong class="title">
        Quick Add Task
      </strong>
      <text-input
        class="input"
        @submitted="addTask"
        :focused="true">
      </text-input>
    </div>
  </modal>
</template>

<script>
  import TextInput from '@/components/UIComponents/Inputs/TextInput.vue'

  export default {
    components: {
      'text-input': TextInput
    },

    methods: {
      addTask (taskName) {
        this.$store.dispatch('addTask', {name: taskName})
        this.$modal.hide('add-task')
      }
    }
  }

</script>
<style scoped>
  .content {
    padding: 20px;
  }
  .input {
    margin-top: 10px;
  }
</style>
