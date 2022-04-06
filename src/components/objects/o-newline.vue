<template>
  <br />
</template>

<script>
import ObjectsMixin from './objects.mixin.js'

export default {
  name: 'o-newline',
  mixins: [ObjectsMixin],
  mounted() {
    this.$emit('update:result', { body: '\n' })
  },
}
</script>

<style lang="scss" scoped></style>
