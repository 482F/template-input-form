<template>
  <v-textarea
    class="a-textarea"
    ref="root"
    variant="outlined"
    no-resize
    :readonly="readonly"
  />
</template>

<script>
export default {
  name: 'a-textarea',
  props: {
    readonly: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    focus() {
      this.$refs.root?.$el?.getElementsByTagName('textarea')?.[0]?.focus?.()
    },
  },
}
</script>

<style lang="scss" scoped>
.a-textarea {
  display: block;
  > ::v-deep(.v-input__control) {
    height: 100%;
    > .v-field {
      height: 100%;
    }
  }
  > ::v-deep(.v-input__details) {
    display: none;
  }
}
</style>
