<template>
  <div class="flex items-center justify-center pt-3">
      <section class="table-wrap">
        <table>
          <thead>
            <tr>
              <th style="width: 5%;"><!-- Checkbox --></th>
              <th style="width: 60%;">Title</th>
              <th style="width: 30%;">Published at</th>
              <th style="width: 5%;"><!-- Handle --></th>
            </tr>
          </thead>
          <tbody v-if="initialLoad">
            <tr v-for="index in 20">
              <td><!-- Checkbox --></td>
              <td>
                <skeleton :min-width="4" :max-width="10" />
              </td>
              <td><skeleton :min-width="2" :max-width="5" /></td>
              <td><skeleton :min-width="1" :max-width="0" /></td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr v-for="article in articles.results">
              <td>
                <div class="check-wrap">
                  <input type="checkbox" :id="`article-${article.id}`">
                  <label class="checkbox-wrap" :for="`article-${article.id}`">
                    <i class="ph ph-check"></i>
                  </label>
                </div>
              </td>
              <td>
                <div class="title-wrap">
                  {{ article.title }}
                </div>
              </td>
              <td>{{ formatDate(article.published_at) }}</td>
              <td>
                <div class="handle-wrap">
                  <i class="ph ph-dots-six-vertical"></i>
                </div>
              </td>
            </tr>
          </tbody>
          <Transition name="fade">
            <div v-if="loading && !initialLoad" class="loader-overlay">
              <i class="ph-bold ph-circle-notch"></i>
            </div>
          </Transition>
        </table>
        <nav>
          <span class="nav-desc">
            <skeleton v-if="loading" :min-width="7" :max-width="8" />
            <template v-else>
              Showing {{ offset }}-{{ articleLimit + offset }} of {{ articles.count }} items
            </template>
          </span>
          <div class="buttons-wrap">
            <button v-for="index in 4" @click="page = index" :class="{active: page === index}">
              {{ index }}
            </button>
          </div>
        </nav>
      </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import dayjs from "dayjs"
import Skeleton from '../components/skeleton.vue'

export default {
  components: {
    Skeleton
  },

  mounted() {
    this.fetchArticles()
  },

  data() {
    return {
      loading: true,
      initialLoad: true,
      articleLimit: 20,
      offset: 0,
      page: 1,
    }
  },

  computed: {
    ...mapGetters(['articles']),
  },

  watch: {
    page(newVal) {
      this.offset = (newVal - 1) * this.articleLimit
    },
    offset(newVal) {
      this.fetchArticles()
    }
  },

  methods: {
    formatDate(date) {
      return dayjs(date).format('DD MMMM YYYY')
    },

    async fetchArticles() {
      this.loading = true
      const params = {
        limit: this.articleLimit,
        offset: this.offset
      }
      await this.$store.dispatch("getArticles", params)
      this.loading = false
      this.initialLoad = false
    },
  }
}
</script>

<style lang="scss" scoped>
  .table-wrap {
    border-radius: 8px;
    box-shadow: 0 2px 8px 0 rgb(0 0 0 / 15%);
    background-color: #fff;
    width: 1000px;
    overflow: hidden;
    color: var(--black);
  }

  table {
    width: 100%;
    position: relative;

    tr {
      &:nth-child(even) {
        background-color: var(--grey-accent);
      }
      border-bottom: 1px solid var(--grey);
    }

    th {
      text-align: left;
      font-weight: 500;
      background-color: var(--grey-accent);
    }

    td {
      font-weight: 300;
      overflow: hidden;
      position: relative;
    }

    th,
    td {
      padding: 0.5rem;
    }
  }

  .check-wrap {
    input {
      position: absolute;
      width: 0;
      height: 0;
      top: 0;
      left: 0;
      opacity: 0;
    }

    label {
      display: inline-flex;
      width: 1.25rem;
      height: 1.25rem;
      border: 2px solid var(--black);
      justify-content: center;
      align-items: center;

      i {
        display: none;
      }
    }

    input:checked+label {
      i {
        display: block;
      }
    }
  }

  .title-wrap {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    max-width: 600px;
  }

  .handle-wrap {
    cursor: grab;
    display: flex;

    &:active {
      cursor: grabbing;
    }
  }

  nav {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    padding: 0.5rem 1rem;
    font-weight: 300;
    font-size: 0.875rem;
    position: relative;
    align-items: center;

    .buttons-wrap {
      display: flex;
      align-items: center;
      gap: 1rem;

      button {
        height: 2rem;
        width: 2rem;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 4px;
      }
    
      button.active {
        background: var(--primary-color);
        color: #fff;
      }
    }
  }

  .loader-overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    background: rgb(52 157 159 / 40%);
    display: flex;
    justify-content: center;
    align-items: flex-start;
    font-size: 2rem;
    padding: 2rem;
    color: var(--primary-color);

    i {
      animation-name: spinner;
      animation-duration: 1s;
      animation-timing-function: linear;
      animation-iteration-count: infinite;
    }
  }

  @keyframes spinner {
    to { transform: rotate(360deg); }
  }

</style>