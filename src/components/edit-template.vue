<template>
  <div class="edit-template">
    <div class="template-name-form">
      テンプレート名
      <a-text-field
        :model-value="name"
        @update:model-value="$emit('update:name', $event)"
      />
    </div>
    <a-textarea
      class="template-body-form"
      :model-value="body"
      @update:model-value="$emit('update:body', $event)"
    />
  </div>
</template>

<script>
export default {
  name: 'edit-template',
  props: {
    name: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.edit-template {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  > * {
    width: 100%;
  }
  > .template-name-form {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
  }
  > .template-body-form {
    min-height: 0;
    flex-grow: 1;
  }
}
</style>
