import Vue from 'vue'
import Vuex from 'vuex'

import Api from '../api/api'

const api = new Api()

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        articles: {
            count: 0,
            next: null,
            previous: null,
            results: []
        }
    },

    getters: {
        articles(state) {
            return state.articles
        }
    },
    
    actions: {
        async getArticles(state, params) {
            const URL = 'https://api.spaceflightnewsapi.net/v4/articles/'
            try {
                const response = await api.get(URL, params)
                // await new Promise(resolve => setTimeout(resolve, 10000))
                this.commit('storeArticles', {articleResponse: response.data})
            }
            catch(error) {
                console.log(error)
            }
        }
    },

    mutations: {
        storeArticles(state, {articleResponse}) {
            this.state.articles = articleResponse
        }
    },
})
