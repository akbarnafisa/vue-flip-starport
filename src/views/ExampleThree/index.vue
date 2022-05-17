<template>
  <div
    class="w-screen h-screen overflow-y-auto overflow-x-hidden"
    id="example-three-main"
  >
    <div class="max-w-md mx-auto px-4 py-6">
      <h1 class="font-semibold text-center text-2xl mb-6">Movies</h1>
      <input
        class="shadow-lg appearance-none border border-gray-100 rounded w-full py-3 px-4 text-gray-600 mb-8 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
        id="inline-full-name"
        type="text"
        placeholder="Search"
        v-model="searchKey"
        @input="onSearch"
      />
      <h2 class="text-purple-700 text-lg mb-4">Your Recents</h2>
      <section class="grid grid-cols-2 gap-4">
        <RouterLink
          v-for="(movie, id) in movies"
          :key="id"
          :to="`/example-3/${movie.id}`"
          class="mb-2"
        >
          <div class="mb-2">
            <Starport
              :port="String(movie.id)"
              :duration="300"
              class="rounded-lg movie-poster shadow-lg"
            >
              <MyComponent
                alt="img"
                class="rounded-lg movie-poster w-full h-full object-cover"
                :img="movie.img"
              />
            </Starport>
          </div>
          <h3 class="text-gray-700">
            {{ movie.title }}
          </h3>
          <h4 class="text-xs text-gray-500">
            {{ movie.publishedYear }}
          </h4>
        </RouterLink>
      </section>
    </div>
  </div>
</template>
<script lang="ts">
// Lib
import { computed, defineComponent, onMounted, ref } from 'vue'
import { Starport } from 'vue-starport'

// Utils
import { ExampleThreeData as moviesData } from '../../data'
import useScrollPosition, {
  ComponentScrollPosition,
} from '../../composables/useScrollPosition'

// Components
import MyComponent from '../../components/ExampleTwo/MyComponent.vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  components: {
    Starport,
    MyComponent,
  },
  created () {
    if (this.$route.query.q) {
      this.searchKey = this.$route.query.q as string
    }
  },
  setup() {
    const { fromRoute } = useScrollPosition({
      component: '#example-three-main',
      storageName: 'example-three-main',
      scrollPosition: 'scrollTop',
    })

    const searchKey = ref('')
    const router = useRouter()

    const movies = computed(() => {
      if (searchKey.value) {
        return moviesData.filter((movie) =>
          movie.title
            .toLocaleLowerCase()
            .includes(searchKey.value.toLocaleLowerCase())
        )
      }
      return moviesData
    })

    const onSearch = (e: Event) => {
      router.replace({
        name: 'example-3',
        query: {
          q: (e.target as HTMLInputElement).value,
        },
      })
    }

    return {
      fromRoute,
      movies,
      searchKey,
      onSearch,
    }
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      ;(vm as ComponentScrollPosition).fromRoute = from.name
    })
  },
})
</script>

<style scoped>
.movie-poster {
  aspect-ratio: 2 / 3;
}
</style>

<style>
html {
  background: white;
}
</style>
