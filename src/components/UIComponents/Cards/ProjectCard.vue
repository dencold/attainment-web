<template>
  <div class="card">
    <div class="header">
      <h4 class="title">{{project.name}}</h4>
      <p class="category">
        <span>{{project.subTitle}}</span>
      </p>
    </div>
    <div class="content">
      <div class="footer">
        <hr>
        <div class="stats">
          <span>{{project.footer}}</span>
        </div>
        <div class="pull-right"></div>
      </div>
    </div>

  </div>
</template>
<script>
  export default {
    name: 'chart-card',
    props: {
      project: Object
    }
  }

</script>
<style>

</style>
