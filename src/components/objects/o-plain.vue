<template>
  <span>
    <template v-for="(value, i) of nonBreakedValues" :key="i">
      <span v-if="value.type === 'plain'">{{ value.value }}</span>
      <span v-else-if="value.type === 'nbsp'" v-html="value.value" />
    </template>
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
  computed: {
    nonBreakedValues() {
      const values = []
      const value = this.object.value ?? ''
      const matches = value.matchAll(/\s+/g)
      let processed = 0
      for (const match of matches) {
        values.push({
          type: 'plain',
          value: value.slice(processed, match.index),
        })
        values.push({
          type: 'nbsp',
          value: Array(match[0].length).fill('&nbsp;').join(''),
        })
        processed += match.index + match.length
      }
      values.push({
        type: 'plain',
        value: value.slice(processed, value.length),
      })
      return values
    },
  },
}
</script>

<style lang="scss" scoped></style>
