<template>
  <v-slider
    class="a-slider"
    ref="root"
    density="compact"
    :min="min"
    :max="max"
    :step="step"
  />
</template>

<script>
export default {
  name: 'a-slider',
  props: {
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 10,
    },
    step: {
      type: Number,
      default: 1,
    },
  },
  methods: {
    focus() {
      this.$refs.root?.$el?.querySelector('.v-slider-thumb')?.focus?.()
    },
  },
}
</script>

<style lang="scss" scoped>
.a-slider {
  > ::v-deep(.v-input__details) {
    display: none;
  }
}
</style>
