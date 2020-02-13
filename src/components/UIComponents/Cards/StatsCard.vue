<template>
    <div class="grid card">

      <div class="icon">
        <span>
          <i :class="icon" :style="{ color: iconColor }"></i>
        </span>
      </div>

      <div class="stats">
        <div class="header"><span>{{header}}</span></div>
        <div class="stat"><span>{{stat}}</span></div>
      </div>

      <div class="footer"><span>{{footer}}</span></div>

    </div>
</template>
<script>
  export default {
    name: 'stats-card',

    props: {
      icon: String,
      iconColor: String,
      header: String,
      footer: String,
      stat: String
    },

  }

</script>
<style scoped>
  .card {
    background-color: #FFF;
    border-radius: 6px;
    border: 3px solid #FFF;
    margin-bottom: 3px;
    padding: 5px;
  }
  .grid {
    display: grid;
    grid-template-columns: 50px 1fr;
    grid-template-rows: 75px 25px;
    grid-template-areas:
      "icon   stats"
      "footer footer";
  }
  .icon {
    grid-area: icon;
    font-size: 2.1em;
    padding: 5px;
  }
  .stats {
    grid-area: stats;
    text-align: right;
  }
  .header {
    font-size: 16px;
  }
  .stat {
    font-size: 2em;
  }
  .footer {
    grid-area: footer;
    border-top: 1px solid #ece5e5;
    color: #d5d5d5;
  }
</style>
