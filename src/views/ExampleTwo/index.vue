<template>
  <div
    class="w-screen bg-black h-screen overflow-y-auto overflow-x-hidden"
    id="example-two-main"
  >
    <div class="max-w-md mx-auto px-4 py-6">
      <section class="mb-6">
        <h2 class="text-white text-3xl font-bold">TIMELINE</h2>
        <h4 class="text-green-400 font-semibold text-sm">
          You have {{ images.length }} memories
        </h4>
      </section>

      <section class="timeline">
        <div v-for="image in images" :key="image.id" class="mb-6 flex">
          <div
            class="w-4 h-4 rounded-full relative z-10 bg-green-400 mr-4 flex-shrink-0 mt-2"
          />
          <div class="w-full">
            <h4 class="text-white text-lg font-semibold">
              {{ image.title }}
            </h4>
            <p class="text-gray-500 mb-2 text-sm">{{ image.timestamp }}</p>
            <RouterLink :to="`/example-2/${image.id}`">
              <Starport
                :port="String(image.id)"
                :duration="300"
                class="h-48 overflow-hidden rounded-lg"
              >
                <MyComponent
                  :img="image.img"
                  class="object-cover w-full h-full"
                />
              </Starport>
            </RouterLink>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<script lang="ts">
// Lib
import { defineComponent } from 'vue'
import { Starport } from 'vue-starport'

// Utils
import { ExampleTwoData as images } from '../../data'
import useScrollPosition, { ComponentScrollPosition } from '../../composables/useScrollPosition'

// Components
import MyComponent from '../../components/ExampleTwo/MyComponent.vue'

export default defineComponent({
  components: {
    Starport,
    MyComponent,
  },
  setup() {
    const { fromRoute } = useScrollPosition({
      component: '#example-two-main',
      storageName: 'example-two-main',
      scrollPosition: 'scrollTop'
    })
    return {
      fromRoute,
      images,
    }
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      ;(vm as ComponentScrollPosition).fromRoute = from.name
    })
  },
})
</script>

<style>
body {
  background: black;
}
</style>

<style scoped>
.timeline {
  position: relative;
  overflow: hidden;
}

.timeline::after {
  content: '';
  width: 2px;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.1);
  position: absolute;
  left: 7px;
  top: 8px;
  z-index: 1;
}
</style>
