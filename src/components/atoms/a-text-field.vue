<template>
  <v-text-field class="a-text-field" variant="outlined" density="compact" />
</template>

<script>
export default {
  name: 'a-text-field',
}
</script>

<style lang="scss" scoped>
.a-text-field {
  > ::v-deep(.v-input__details) {
    display: none;
  }
}
</style>
