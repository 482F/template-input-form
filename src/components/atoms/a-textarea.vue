<template>
  <v-textarea
    class="a-textarea"
    :class="{ resizable }"
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
    resizable: {
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
  &.resizable {
    resize: vertical;
  }
  overflow-y: hidden;
  display: block;
  > ::v-deep(.v-input__control) {
    height: 100%;
    > .v-field {
      height: 100%;
      > .v-field__field {
        padding-top: 4px;
        min-height: 0;
      }
    }
  }
  > ::v-deep(.v-input__details) {
    display: none;
  }
}
</style>
