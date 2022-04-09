<template>
  <span class="o-plain">
    <div v-for="(row, i) of nonBreakedRows" :key="i">
      <template v-for="(value, j) of row" :key="j">
        <span v-if="value.type === 'plain'">{{ value.value }}</span>
        <span v-else-if="value.type === 'nbsp'" v-html="value.value" />
      </template>
    </div>
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
    nonBreakedRows() {
      return (this.object.value ?? '').split('\n').map((row) => {
        const values = []
        const matches = row.matchAll(/\s+/g)
        let processed = 0
        for (const match of matches) {
          values.push({
            type: 'plain',
            value: row.slice(processed, match.index),
          })
          values.push({
            type: 'nbsp',
            value: Array(match[0].length).fill('&nbsp;').join(''),
          })
          processed = match.index + match[0].length
        }
        values.push({
          type: 'plain',
          value: row.slice(processed, row.length),
        })
        return values
      })
    },
  },
}
</script>

<style lang="scss" scoped></style>
