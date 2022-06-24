<template>
  <div class="album-item">
    <span>{{name}}</span>
  </div>
</template>

<script>
export default {
  name: 'AlbumComponent',
  props: {
    name: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.album-item {
  margin-bottom: 15px;
  padding: 5px 10px;
  background: lightgreen;
  border-radius: 5px;
}
</style>