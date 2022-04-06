<template>
  <span>
    {{ object.value }}
  </span>
</template>

<script>
import ObjectsMixin from './objects.mixin.js'

export default {
  name: 'o-text',
  mixins: [ObjectsMixin],
  mounted() {
    this.$emit('update:result', { body: this.object.value })
  },
}
</script>

<style lang="scss" scoped></style>
