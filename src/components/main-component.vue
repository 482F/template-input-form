<template>
  <div class="main-component">
    <div class="header">
      <a class="version-icon" :href="version.other.link">
        <a-icon-button class="icon current" :icon="version.current.icon" />
        <a-icon-button
          class="icon other"
          :icon="version.other.icon"
          :tooltip="version.other.name + 'へ'"
        />
      </a>
      <a href="https://github.com/482F/template-input-form/wiki">
        <a-icon-button icon="mdi-library-shelves" tooltip="wiki" />
      </a>
    </div>
    <div class="content">
      <div class="left">
        <div class="template-control">
          <a-select
            :model-value="currentTemplate?.name"
            :items="templates.map((template) => template.name)"
            @update:model-value="updateCurrent"
            class="select"
          />
          <a-icon-button
            v-if="editing"
            @click="stopEdit"
            icon="mdi-eye"
            tooltip="編集を中断"
          />
          <a-icon-button
            v-else
            @click="editTemplate"
            icon="mdi-pencil"
            tooltip="現在のテンプレートを編集"
          />
          <a-icon-button
            @click="addTemplate"
            icon="mdi-plus"
            tooltip="新規テンプレートを作成"
          />
          <a-icon-button
            @click="deleteTemplate"
            icon="mdi-delete"
            tooltip="現在のテンプレートを削除"
          />
          <a-icon-button
            @click="saveTemplates"
            icon="mdi-content-save"
            tooltip="全てのテンプレートの変更を保存"
          />
          <a-icon-button
            @click="restoreTemplates"
            icon="mdi-backup-restore"
            tooltip="全てのテンプレートの変更を破棄して戻す"
          />
          <a-icon-button
            @click="reloadInputForm"
            icon="mdi-reload"
            tooltip="入力フォームを初期化する"
          />
        </div>
        <template-input-form
          class="template-input-form"
          v-if="!reloading"
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
        <result v-else :result="result" />
      </div>
    </div>
  </div>
</template>

<script>
import EditTemplate from './edit-template.vue'
import TemplateInputForm from './template-input-form.vue'
import Result from './result.vue'

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
    Result,
  },
  data() {
    return {
      editing: false,
      reloading: false,
      currentTemplate: null,
      templates: [],
      result: {},
    }
  },
  computed: {
    version() {
      const stable = {
        link: location.href.replace(/latest\/$/, ''),
        name: '安定版',
        icon: 'mdi-scale-balance',
      }

      const latest = {
        link: location.href + 'latest/',
        name: '最新版',
        icon: 'mdi-scale-unbalanced',
      }
      return location.href.match(/latest\/$/)
        ? { current: latest, other: stable }
        : { current: stable, other: latest }
    },
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
    async reloadInputForm() {
      this.reloading = true
      await this.$nextTick()
      this.reloading = false
    },
    async stopEdit() {
      this.editing = false
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
  --padding-x: 12rem;
  height: 100vh;
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  > .header {
    display: flex;
    padding: 0 var(--padding-x);
    gap: 1rem;
    > a {
      color: black;
      text-decoration: none;
    }
    > .version-icon {
      position: relative;
      > .other {
        position: absolute;
        left: 0;
      }
      &:hover {
        > .current {
          visibility: hidden;
        }
      }
      &:not(:hover) {
        > .other {
          visibility: hidden;
        }
      }
    }
  }
  > .content {
    min-height: 0;
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: start;
    gap: 1rem;
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
      padding-left: var(--padding-x);
      > .template-control {
        position: sticky;
        top: 0;
        z-index: 1;
        background-color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;
      }
      > .template-input-form {
        overflow-wrap: anywhere;
        min-height: 0;
        flex-grow: 1;
      }
    }
    > .right {
      padding-right: var(--padding-x);
      > * {
        height: 100%;
      }
    }
  }
}
</style>
