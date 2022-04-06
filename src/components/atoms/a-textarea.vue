<template>
  <v-textarea class="a-textarea" variant="outlined" no-resize />
</template>

<script>
export default {
  name: 'a-textarea',
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
