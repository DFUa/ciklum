<template>
  <div class="wrapper">
    <div class="albums-wrapper">
      <Card
        v-for="album in albums"
        :key="album.id"
        :name="album.title"
      ></Card>
    </div>
    <div class="photos-wrapper">
      <Card
        backgreoundColor="pink"
        v-for="photo in photos"
        :key="photo.id"
        :name="photo.title"
        :image="photo.thumbnailUrl"
      ></Card>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'MainPage',
  data() {
    return {
      albums: [],
      photos: []
    }
  },
  computed: {
    ...mapGetters(['getPhotos']),
  },
  mounted() {
    this.createAlbums()
      .then((data) => {
        this.albums = data
        return this.createPhotos()
      })
      .then((data) => {
        console.log(data);
        this.photos = data;
      })
  },
  methods: {
    ...mapActions(['createPhotos', 'createAlbums']),
  },
}
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  justify-content: space-between;
}
</style>