<template>
  <div v-if="movie" class="px-4 py-6 max-w-md mx-auto">
    <section class="mb-6">
      <Starport :port="String(movie.id)" :duration="300" class="movie-poster">
        <MyComponent
          alt="img"
          class="movie-poster w-full h-full object-cover rounded-md shadow-lg mx-auto"
          :img="movie.img"
        />
      </Starport>
    </section>
    <section class="flex justify-between items-center mb-6">
      <div>
        <h2 class="text-xl font-semibold">
          {{ movie.title }}
        </h2>
        <h4 class="text-sm font-semibold text-purple-600 mb-2">
          {{ movie.publishedYear }}
        </h4>
        <div class="flex">
          <IconStar
            v-for="(star, index) in movie.ratingMap"
            class="mr-1"
            width="20"
            height="20"
            :key="index"
            :stroke="star ? 'rgb(168, 85, 247)' : 'rgb(209, 213, 219)'"
            :fill="star ? 'rgb(168, 85, 247)' : 'rgb(209, 213, 219)'"
          />
        </div>
      </div>
      <div>
        <IconPlay height="56" width="56" fill="rgb(168, 85, 247)" />
      </div>
    </section>
    <section class="text-gray-700">
      {{ movie?.desc }}
      {{ movie?.desc }}
      {{ movie?.desc }}

    </section>
  </div>
</template>

<script lang="ts">
// Lib
import { computed, defineComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Starport } from 'vue-starport'

// Utils
import { ExampleThreeData as movies } from '../../data'

// Components
import MyComponent from '../../components/ExampleTwo/MyComponent.vue'
import IconPlay from '../../components/lib/IconPlay.vue'
import IconStar from '../../components/lib/IconStar.vue'

export default defineComponent({
  components: {
    Starport,
    MyComponent,
    IconPlay,
    IconStar,
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const id = route.params.id

    const movie = computed(() => {
      const currentImage = movies.filter((v) => v.id === id)[0]
      if (!currentImage) {
        router.replace({
          name: 'example-2',
        })
        return
      }

      return {
        ...currentImage,
        ratingMap: new Array(5).fill(1, 0, currentImage.rating),
      }
    })

    return {
      movie,
    }
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
