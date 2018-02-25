<template>
</template>
<script>
  export default {
    props: {
      'items': Array
    },

    data () {
      return {
        currFocusIndex: null
      }
    },

    created () {
      document.addEventListener('keyup', this.handleKeyUp)
    },

    destroyed () {
      document.removeEventListener('keyup', this.handleKeyUp)
      this.currFocusIndex = null
    },

    methods: {
      handleKeyUp (e) {
        if (e.key === 'j') {
          this.moveDown()
        } else if (e.key === 'k') {
          this.moveUp()
        }
      },
      moveDown () {
        if (this.currFocusIndex === null) {
          this.initFocus()
        } else {
          if (this.currFocusIndex < this.items.length - 1) {
            this.currFocusIndex += 1
            this.emitChange()
          }
        }
      },
      moveUp () {
        if (this.currFocusIndex === null) {
          this.initFocus()
        } else {
          if (this.currFocusIndex > 0) {
            this.currFocusIndex -= 1
            this.emitChange()
          }
        }
      },
      initFocus () {
        this.currFocusIndex = 0
        this.emitChange()
      },
      emitChange () {
        this.$emit('focusChange', {index: this.currFocusIndex})
      }
    }
  }

</script>
