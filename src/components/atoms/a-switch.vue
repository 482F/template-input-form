<template>
  <v-switch
    class="a-switch"
    ref="root"
    flat
    density="compact"
    color="blue"
    :label="label"
  />
</template>

<script>
export default {
  name: 'a-switch',
  props: {
    label: {
      type: String,
      default: '',
    },
  },
  methods: {
    focus() {
      this.$refs.root?.$el?.getElementsByTagName('input')?.[0]?.focus?.[0]
    },
  },
}
</script>

<style lang="scss" scoped>
.a-switch {
  padding: 0 1rem;
  > ::v-deep(.v-input__details) {
    display: none;
  }
}
</style>
