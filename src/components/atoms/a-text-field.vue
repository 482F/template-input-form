<template>
  <v-text-field
    class="a-text-field"
    ref="root"
    variant="outlined"
    density="compact"
  />
</template>

<script>
export default {
  name: 'a-text-field',
  methods: {
    focus() {
      this.$refs.root?.$el?.getElementsByTagName('input')?.[0]?.focus?.()
    },
  },
}
</script>

<style lang="scss" scoped>
.a-text-field {
  > ::v-deep(.v-input__details) {
    display: none;
  }
}
</style>
