<!-- Please remove this file from your project -->
<template>
  <div>123</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'MainPage',
  computed: {
    ...mapGetters(['getPhotos']),
  },
  methods: {
    ...mapActions(['createPhotos']),
  },
}
</script>
