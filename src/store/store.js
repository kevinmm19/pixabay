import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        images: [],
        loading: true,
        isMobileView: false,
        error429: false,
        errorFetch: false
    },
    mutations: {
        setFlags(state, payload) {
            state.errorFetch = payload.errorFetch;
            state.error429 = payload.error429;
            state.loading = payload.loading;
        },
        setImages(state, payload) {
            state.images = payload.list;
        },
        setViewType(state, payload) {
            state.isMobileView = payload.isMobileView;
        }
    }
});