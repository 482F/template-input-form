<template>
  <v-select
    :items="items"
    :model-value="modelValue"
    @update:model-value="$emit('update:model-value', $event)"
    ref="root"
    class="a-select"
    density="compact"
    variant="outlined"
    @keydown.up.prevent="move(-1)"
    @keydown.down.prevent="move(1)"
  />
</template>

<script>
export default {
  name: 'a-select',
  props: {
    items: {
      type: Array,
      required: true,
    },
    modelValue: {
      type: [Number, String, Array],
    },
  },
  methods: {
    focus() {
      this.$refs.root?.$el?.getElementsByTagName('input')?.[0]?.focus?.()
    },
    move(delta) {
      const currentIndex = this.items.findIndex(
        (item) => item === this.modelValue
      )
      const nextIndex = Math.min(
        Math.max(currentIndex + delta, 0),
        this.items.length - 1
      )
      const nextItem = this.items[nextIndex]
      console.log(nextItem, currentIndex, this.modelValue)
      this.$emit('update:model-value', nextItem)
    },
  },
}
</script>

<style lang="scss" scoped>
.a-select {
  > ::v-deep(.v-input__details) {
    display: none;
  }
}
</style>
