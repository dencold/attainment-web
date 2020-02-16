<template>
  <div>
    <div class="cards">
      <stats-card
        icon="ti-angle-double-right"
        iconColor="green"
        header="Tasks"
        :stat="numTasksToday"
        footer="assigned today">
      </stats-card>

      <stats-card
        icon="ti-timer"
        iconColor="green"
        header="Time"
        :stat="totalTimeTasksToday"
        footer="estimated to complete">
      </stats-card>

      <stats-card
        icon="ti-check-box"
        iconColor="green"
        header="Completed"
        :stat="numTasksCompletedToday"
        footer="total today">
      </stats-card>
    </div>
  </div>
</template>
<script>
  import StatsCard from '@/components/UIComponents/Cards/StatsCard.vue'

  export default {
    components: {
      'stats-card': StatsCard,
    },

    computed: {
      numTasksToday () {
        return this.$store.getters.numTasksToday.toString()
      },
      numTasksCompletedToday () {
        return this.$store.getters.numTasksCompletedToday.toString()
      },
      totalTimeTasksToday () {
        const totalTime = this.$store.getters.totalTimeTasksToday
        let humanized = ""

        let hrs = Math.floor(totalTime / 60)
        let mins = totalTime % 60

        if (hrs > 0) {
          humanized += hrs + "h "
        }

        humanized += mins + "m"
        return humanized
      }
    },

  }

</script>
<style>
  .cards {
    display: grid;
    grid-gap: 20px;
    grid-template-columns: repeat(3, 200px);
    justify-content: center;
    grid-column-start: 1;
    grid-column-end: 3;
  }
</style>
