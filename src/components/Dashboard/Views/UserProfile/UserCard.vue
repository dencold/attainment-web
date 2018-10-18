<template>
  <div class="card card-user">
    <div class="image">
      <img src="/img/background.jpg" alt="background">
    </div>
    <div class="content">
      <div class="author">
        <img class="avatar border-white" :src="user.photoURL" alt="avatar">
        <h4 class="title">{{user.displayName}}
          <br>
          <a href="#">
            <small>@dencold</small>
          </a>
        </h4>
      </div>
    </div>
    <hr>
    <div class="text-center">
      <div class="row">
        <div v-for="(info,index) in details" :class="getClasses(index)" :key="index">
          <h5>{{info.title}}
            <br>
            <small>{{info.subTitle}}</small>
          </h5>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        details: [
          {
            title: '12',
            subTitle: 'Files'
          },
          {
            title: '2GB',
            subTitle: 'Used'
          },
          {
            title: '24,6$',
            subTitle: 'Spent'
          }
        ]
      }
    },
    computed: {
      user () {
        return this.$store.state.user
      }
    },
    methods: {
      getClasses (index) {
        var remainder = index % 3
        if (remainder === 0) {
          return 'col-md-3 col-md-offset-1'
        } else if (remainder === 2) {
          return 'col-md-4'
        } else {
          return 'col-md-3'
        }
      }
    }
  }

</script>
<style>
  
</style>
