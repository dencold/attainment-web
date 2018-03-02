<template>
</template>
<script>
  export default {
    props: {
      'items': Array,
      'currIndex': Number
    },

    created () {
      document.addEventListener('keyup', this.handleKeyUp)
    },

    destroyed () {
      document.removeEventListener('keyup', this.handleKeyUp)
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
        if (this.currIndex === null) {
          this.initFocus()
        } else {
          if (this.currIndex < this.items.length - 1) {
            this.emitChange(this.currIndex + 1)
          }
        }
      },
      moveUp () {
        if (this.currIndex === null) {
          this.initFocus()
        } else {
          if (this.currIndex > 0) {
            this.emitChange(this.currIndex - 1)
          }
        }
      },
      initFocus () {
        this.emitChange(0)
      },
      emitChange (index) {
        this.$emit('focusChange', {index: index})
      }
    }
  }

</script>
