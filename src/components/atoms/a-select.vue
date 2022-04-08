<template>
  <v-select
    :items="items"
    class="a-select"
    density="compact"
    variant="outlined"
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
