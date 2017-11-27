<template>
  <div class="card">
    <div class="header">
      <h4 class="title">{{task.name}}</h4>
      <p class="category">
        <span>{{task.details}}</span>
      </p>
    </div>
    <div class="content">
      <div class="footer">
        <hr>
        <div class="stats">
          <span>{{task.footer}}</span>
        </div>
        <div class="pull-right"></div>
      </div>
    </div>

  </div>
</template>
<script>
  export default {
    name: 'task-card',
    props: {
      task: Object
    }
  }

</script>
<style>

</style>
