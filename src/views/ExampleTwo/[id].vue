<template>
  <div class="bg-black h-screen w-screen flex items-center justify-center">
    <Overlay @click="onClose" />
    <IconClose
      class="absolute right-2 top-2 cursor-pointer"
      @click="onClose"
    />
    <div v-if="image" class="max-w-md w-full">
      <Starport
        :port="String(image.id)"
        :duration="300"
        :style="{ width: '100%', height: '250px' }"
      >
        <MyComponent
          :title="image.title"
          :timestamp="image.timestamp"
          :img="image.img"
        />
      </Starport>
    </div>
  </div>
</template>

<script lang="ts">
// Lib
import { computed, defineComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Starport } from 'vue-starport'

// Utils
import { ExampleTwoData as images } from '../../data'

// Components
import MyComponent from '../../components/ExampleTwo/MyComponent.vue'
import Overlay from '../../components/lib/Overlay.vue'
import useCloseModal from '../../composables/useCloseModal'
import IconClose from '../../components/lib/IconClose.vue'

export default defineComponent({
  components: {
    Starport,
    MyComponent,
    Overlay,
    IconClose,
  },
  setup() {
    const { onClose } = useCloseModal()
    const route = useRoute()
    const router = useRouter()
    const id = route.params.id

    const image = computed(() => {
      const currentImage = images.filter((v) => v.id === id)[0]
      if (!currentImage) {
        router.replace({
          name: 'example-2'
        })
        return
      }
      return currentImage
    })

    return {
      image,
      onClose,
    }
  },
})
</script>

<style>
body {
  background: black;
}
</style>