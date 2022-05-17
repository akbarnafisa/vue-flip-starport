<template>
  <div class="max-w-md mx-auto pb-6">
    <section class="p-4 flex justify-between">
      <h2 class="text-2xl font-semibold">Photos</h2>
      <img
        class="w-9 h-9 rounded-full"
        alt="avatar"
        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200"
      />
    </section>
    <section class="flex overflow-auto px-3 pb-4" id="example-one-vertical">
      <RouterLink
        v-for="image in images"
        :key="image.id"
        :to="`/example-1/${image.id}`"
      >
        <Starport :port="String(image.id)" class="item" :duration="300">
          <MyComponent alt="img" class="rounded-lg" :img="image.img" />
        </Starport>
      </RouterLink>
    </section>

    <section class="px-4 py-2">
      <RouterLink to="/example-1/5">
        <Starport port="default-id" :duration="300" class="aspect-square">
          <MyComponent
            alt="img"
            class="rounded-lg"
            img="https://images.unsplash.com/photo-1543364195-077a16c30ff3?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=512&ixid=MnwxfDB8MXxyYW5kb218MHw5NDczNDU2Nnx8fHx8fHwxNjQ4OTMyNDcw&ixlib=rb-1.2.1&q=80"
          />
        </Starport>
      </RouterLink>
    </section>
  </div>
</template>
<script lang="ts">
// Lib
import { defineComponent } from 'vue'
import { Starport } from 'vue-starport'
import Vue from 'vue'
import { RouteRecordName } from 'vue-router'

// Utils
import { ExampleOneData as images } from '../../data'

// Components
import MyComponent from '../../components/ExampleOne/MyComponent.vue'
import useScrollPosition, {
  ComponentScrollPosition,
} from '../../composables/useScrollPosition'

type RouteNameType = RouteRecordName | null | undefined

interface MyComponent extends Vue.ComponentPublicInstance {
  fromRoute: RouteNameType
}

export default defineComponent({
  components: {
    Starport,
    MyComponent,
  },
  setup() {
    const { fromRoute } = useScrollPosition({
      component: '#example-one-vertical',
      storageName: 'example-one-vertical',
      scrollPosition: 'scrollLeft',
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

<style scoped>
.item {
  width: 120px;
  height: 190px;
  background-size: cover;
  background-position: center center;
  margin: 8px;
}
</style>
