import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        images: [],
        loading: true,
        error429: false,
        errorFetch: false
    },
    mutations: {
        setImages(state, list) {
            state.images = list;
        },
        setFlags(state, payload) {
            state.errorFetch = payload.errorFetch,
            state.error429 = payload.error429,
            state.loading = payload.loading
        }
    }
});