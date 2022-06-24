<template>
  <div class="card-item" :style="{ 'background-color': backgreoundColor }">
    <div v-if="image" class="card-image-wrapper">
      <img class="card-image" :src="image" alt="#" />
    </div>
    <div class="card-title" :class="{ centered: image }">{{ name }}</div>
  </div>
</template>

<script>
export default {
  name: 'CardComponent',
  props: {
    name: {
      type: String,
      required: true,
    },
    image: String,
    backgreoundColor: {
      type: String,
      default: 'lightgreen',
    },
  },
}
</script>

<style lang="scss" scoped>
.card-item {
  margin-bottom: 15px;
  padding: 10px 15px;
  border-radius: 5px;
  .card-image {
    display: block;
    margin: 0 auto 10px;
  }
  .card-title {
    font-size: 18px;
    &.centered {
      text-align: center;
    }
  }
}
</style>