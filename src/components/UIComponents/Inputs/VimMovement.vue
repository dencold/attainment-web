<template>
</template>
<script>
  export default {
    props: {
      'items': Object
    },

    data () {
      return {
        currFocusIndex: null,
        currFocusId: null
      }
    },

    created () {
      document.addEventListener('keyup', this.handleKeyUp)
    },

    destroyed () {
      document.removeEventListener('keyup', this.handleKeyUp)
      this.currFocusId = null
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
          let keys = Object.keys(this.items)
          if (this.currFocusIndex < keys.length - 1) {
            this.currFocusIndex += 1
            this.currFocusId = keys[this.currFocusIndex]
            this.emitId()
          }
        }
      },
      moveUp () {
        if (this.currFocusIndex === null) {
          this.initFocus()
        } else {
          let keys = Object.keys(this.items)
          if (this.currFocusIndex > 0) {
            this.currFocusIndex -= 1
            this.currFocusId = keys[this.currFocusIndex]
            this.emitId()
          }
        }
      },
      initFocus () {
        this.currFocusIndex = 0
        this.currFocusId = Object.keys(this.items)[0]
      },
      emitId () {
        this.$emit('focusChange', {id: this.currFocusId})
      }
    }
  }

</script>
