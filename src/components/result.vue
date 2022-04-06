<template>
  <div class="result">
    <div class="controls">
      ファイル名: <span class="filename">{{ result.fileName?.[0] ?? '' }}</span>
    </div>
    <a-textarea
      class="body"
      :model-value="result.body?.join?.('') ?? ''"
      readonly
    />
  </div>
</template>

<script>
export default {
  name: 'result',
  props: {
    result: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.result {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  .body {
    flex-grow: 1;
  }
}
</style>
