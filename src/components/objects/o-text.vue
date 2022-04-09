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
}
</script>

<style lang="scss" scoped></style>
