<template>
  <div class="wrapper" id="wrapper">
    <div class="albums-wrapper">
      <h3>Albums</h3>
      <draggable
        v-model="getAlbums"
        draggable=".card-item"
        @end="resetConections"
      >
        <Card
          v-for="album in getAlbums"
          :key="album.id"
          :name="album.title"
          :ref="'album' + album.id"
          :class="{ focus: activeElement === 'album' + album.id }"
          @click.native="addAlbumConnection(album.id)"
        ></Card>
      </draggable>
    </div>
    <div class="photos-wrapper">
      <h3>Photos</h3>
      <draggable
        v-model="getPhotos"
        draggable=".card-item"
        @end="resetConections"
      >
        <Card
          backgreoundColor="pink"
          v-for="photo in getPhotos"
          :key="photo.id"
          :name="photo.title"
          :image="photo.thumbnailUrl"
          :ref="'photo' + photo.id"
          :class="{ focus: activeElement === 'photo' + photo.id }"
          @click.native="addPhotoConnection(photo.id)"
        ></Card>
      </draggable>
    </div>
  </div>
</template>

<script lang="ts">
import { Photo, Album } from '@/types'
import { mapActions } from 'vuex'
import draggable from 'vuedraggable'

export default {
  name: 'MainPage',
  components: {
    draggable,
  },
  data() {
    return {
      currentConnection: [],
      connections: [],
      activeElement: '',
    }
  },
  computed: {
    getPhotos: {
      get(): Photo {
        return this.$store.state.photos
      },
      set(value: Photo[]) {
        this.$store.commit('setPhotos', value)
      },
    },
    getAlbums: {
      get(): Album {
        return this.$store.state.albums
      },
      set(value: Album[]) {
        this.$store.commit('setAlbums', value)
      },
    },
  },
  mounted() {
    this.createAlbums()
      .then(() => {
        return this.createPhotos()
      })
      .then(() => {
        jsPlumb.importDefaults({
          ConnectionsDetachable: true,
          ReattachConnections: true,
          maxConnections: 1,
          Container: 'wrapper',
        })
      })
  },
  methods: {
    ...mapActions(['createPhotos', 'createAlbums']),
    resetConections() {
      jsPlumb.repaintEverything();
    },
    createConnection() {
      if (jsPlumb.getConnections(this.currentConnection[0])) {
        jsPlumb.deleteConnectionsForElement(this.currentConnection[0])
      }

      jsPlumb.connect({
        source: this.currentConnection[0],
        target: this.currentConnection[1],
        anchors: ['LeftMiddle', 'RightMiddle'],
        Connector: 'Straight',
        endpoint: 'Blank',
        overlays: [['Arrow', { location: [0.5, 0.5], width: 15, length: 15 }]],
      })

      this.currentConnection = []
      this.activeElement = ''
    },
    addAlbumConnection(id: number) {
      this.activeElement = 'album' + id
      this.currentConnection[1] = this.$refs['album' + id][0].$el
      this.currentConnection[0] && this.createConnection()
    },
    addPhotoConnection(id: number) {
      this.activeElement = 'photo' + id
      this.currentConnection[0] = this.$refs['photo' + id][0].$el
      this.currentConnection[1] && this.createConnection()
    },
  },
}
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  justify-content: space-between;
}

.focus {
  border-color: #0a58ca;
  box-shadow: 0 0 0 0.25rem rgb(49 132 253 / 50%);
}
</style>