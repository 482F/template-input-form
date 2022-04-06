<template>
  <div class="result">
    <div class="header">
      <div class="file-name">
        ファイル名: <span class="filename">{{ fileName }}</span>
      </div>
      <div class="controls">
        <a-icon-button @click="download" icon="mdi-download" />
        <a-icon-button @click="copy" icon="mdi-content-copy" />
      </div>
    </div>
    <a-textarea tabindex="-1" class="body" :model-value="body" readonly />
  </div>
</template>

<script>
import * as utils from '482-js-utils'

export default {
  name: 'result',
  data() {
    return {
      replacers: [],
    }
  },
  props: {
    result: {
      type: Object,
      required: true,
    },
  },
  methods: {
    download() {
      utils.downloadText(this.fileName, this.body)
    },
    copy() {
      utils.clipText(this.body)
    },
    resolve(text) {
      let newText = text
      this.replacers.forEach(
        ([key, value]) => (newText = newText.replaceAll(key, value))
      )
      return newText
    },
    updateReplacer() {
      this.replacers.splice(0, this.replacers.length)
      const ps = (num) => num.toString().padStart(2, '0')
      const date = new Date()
      this.replacers.push(['\\yyyy', ps(date.getFullYear())])
      this.replacers.push(['\\mm', ps(date.getMonth() + 1)])
      this.replacers.push(['\\dd', ps(date.getDate())])
      this.replacers.push(['\\HH', ps(date.getHours())])
      this.replacers.push(['\\MM', ps(date.getMinutes())])
      this.replacers.push(['\\SS', ps(date.getSeconds())])
      this.replacers.push(['\\weekday', '日月火水木金土日'[date.getDay()]])
      this.replacers.push([/\\delete[.\n]/g, '']) // file-name 等メタ情報の body に含まれる
    },
  },
  mounted() {
    this.updateReplacer()
    setInterval(this.updateReplacer, 1000)
  },
  computed: {
    body() {
      return this.resolve(this.result.body?.join?.('') ?? '')
    },
    fileName() {
      return this.resolve(
        this.result.fileName?.[0] ||
          '\\yyyy-\\mm-\\dd--\\HH-\\MM-\\SS-\\weekday.txt'
      )
    },
  },
}
</script>

<style lang="scss" scoped>
.result {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  > .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    > .controls {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1rem;
    }
  }
  > .body {
    flex-grow: 1;
  }
}
</style>
