<template>
  <div id="app">
    <div style="max-width: 1200px; margin: 24px auto; text-align: left;">
      <TagSelector />
    </div>
  </div>
</template>

<script>
import TagSelector from './components/TagSelector.vue'

export default {
  name: 'App',
  components: {
    TagSelector
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
