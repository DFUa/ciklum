import { GetterTree, ActionTree, MutationTree } from 'vuex';

export const state = () => ({
  photos: [],
  albums: []
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  getPhotos: state => state.photos,
  getAlbums: state => state.albums
}

export const mutations: MutationTree<RootState> = {
  setPhotos(state, photos: []) {
    state.photos = photos;
  },
  setAlbums(state, albums: []) {
    state.albums = albums;
  }
}

export const actions: ActionTree<RootState, RootState> = {
  async createPhotos({ commit }) {
    return await this.$axios
      .$get('https://jsonplaceholder.typicode.com/photos?_start=0&_end=100') // set limit of photos
      .then((data: [object]): void => {
        commit('setPhotos', data)
      },
      (errors: any): Promise<void> => {
        return Promise.reject(errors);
      });
  },
  async createAlbums({ commit }) {
    return await this.$axios
      .$get('https://jsonplaceholder.typicode.com/albums')
      .then((data: [object]): void => {
        commit('setAlbums', data)
      },
      (errors: any): Promise<void> => {
        return Promise.reject(errors);
      });
  }
}