<template>
  <div class="main-component">
    <div class="left">
      <div class="template-control">
        <a-select
          :model-value="currentTemplate?.name"
          :items="templates.map((template) => template.name)"
          @update:model-value="updateCurrent"
          class="select"
        />
        <a-button v-if="editing" @click="editing = false" icon>
          <a-icon>mdi-eye</a-icon>
        </a-button>
        <a-button v-else @click="editTemplate" icon>
          <a-icon>mdi-pencil</a-icon>
        </a-button>
        <a-button @click="addTemplate" icon>
          <a-icon>mdi-plus</a-icon>
        </a-button>
        <a-button @click="deleteTemplate" icon>
          <a-icon>mdi-delete</a-icon>
        </a-button>
        <a-button icon @click="saveTemplates">
          <a-icon>mdi-content-save</a-icon>
        </a-button>
        <a-button icon @click="restoreTemplates">
          <a-icon>mdi-backup-restore</a-icon>
        </a-button>
      </div>
      <template-input-form
        class="template-input-form"
        :template="currentTemplate ?? {}"
        v-model:result="result"
      />
    </div>
    <div class="right">
      <edit-template
        v-if="editing"
        v-model:name="currentTemplate.name"
        v-model:body="currentTemplate.body"
      />
      <a-textarea v-else class="result" :model-value="result.body" />
    </div>
  </div>
</template>

<script>
import EditTemplate from './edit-template.vue'
import TemplateInputForm from './template-input-form.vue'

const storageKeyPrefix = '482f-template-input-form--'
const storageKeys = Object.fromEntries(
  ['templates', 'currentTemplateIndex'].map((key) => [
    key,
    storageKeyPrefix + key,
  ])
)

function createUniqueName(currentName, names) {
  let newName = currentName
  let i = 1
  while (names.includes(newName)) {
    newName = currentName + i++
  }
  return newName
}

export default {
  name: 'main-component',
  components: {
    EditTemplate,
    TemplateInputForm,
  },
  data() {
    return {
      editing: false,
      currentTemplate: null,
      templates: [],
      result: {},
    }
  },
  methods: {
    setUniqueName(targetTemplate) {
      if (!targetTemplate) {
        return
      }
      targetTemplate.name = createUniqueName(
        targetTemplate.name,
        this.templates
          .filter((template) => template !== targetTemplate)
          .map((template) => template.name)
      )
    },
    updateCurrent(name) {
      this.setUniqueName(this.currentTemplate)
      const currentTemplateIndex = this.templates.findIndex(
        (template) => template.name === name
      )
      this.currentTemplate = this.templates[currentTemplateIndex]
      localStorage.setItem(
        storageKeys.currentTemplateIndex,
        currentTemplateIndex
      )
    },
    addTemplate() {
      this.setUniqueName(this.currentTemplate)
      const newTemplate = { name: '', body: '' }
      this.templates.push(newTemplate)
      this.currentTemplate = newTemplate
      this.editTemplate()
    },
    editTemplate() {
      if (!this.currentTemplate) {
        this.addTemplate()
      }
      this.editing = true
    },
    deleteTemplate() {
      if (!this.currentTemplate) {
        return
      }
      this.setUniqueName(this.currentTemplate)
      const currentTemplateIndex = this.templates.findIndex(
        (template) => template.name === this.currentTemplate.name
      )
      this.templates.splice(currentTemplateIndex, 1)
      this.currentTemplate = this.templates[0]
    },
    saveTemplates() {
      this.setUniqueName(this.currentTemplate)
      localStorage.setItem(
        storageKeys.templates,
        JSON.stringify(this.templates)
      )
    },
    restoreTemplates() {
      this.templates = JSON.parse(
        localStorage.getItem(storageKeys.templates) ?? '[]'
      )
      if (this.currentTemplate?.name) {
        this.updateCurrent(this.currentTemplate.name)
      }
    },
    restoreCurrentTemplate() {
      const currentTemplateIndex = localStorage.getItem(
        storageKeys.currentTemplateIndex
      )
      if (!currentTemplateIndex) {
        return
      }
      this.currentTemplate = this.templates[Number(currentTemplateIndex)]
    },
  },
  mounted() {
    this.restoreTemplates()
    this.restoreCurrentTemplate()
  },
}
</script>

<style lang="scss" scoped>
.main-component {
  height: 100vh;
  padding: 3rem 12rem;
  display: flex;
  justify-content: center;
  align-items: start;
  gap: 2rem;
  > .left,
  > .right {
    width: 0;
    height: 100%;
    flex-grow: 1;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  > .left {
    overflow-y: scroll;
    padding-right: 1rem;
    > .template-control {
      position: sticky;
      top: 0;
      background-color: white;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1rem;
    }
    > .template-input-form {
      min-height: 0;
      flex-grow: 1;
    }
  }
  > .right {
    > * {
      height: 100%;
    }
  }
}
</style>
