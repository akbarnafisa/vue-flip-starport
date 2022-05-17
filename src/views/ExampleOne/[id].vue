<template>
  <div class="h-screen w-screen bg-black flex items-center justify-center">
    <Overlay @click="onClose" />
    <IconClose
      class="absolute right-2 top-2 cursor-pointer"
      @click="onClose"
      @keyup.esc="onClose"
    />
    <div class="max-w-md relative z-10">
      <Starport
        :port="String(image.id)"
        :duration="300"
        :style="{ width: '320px', height: '462px', maxHeight: '100vh' }"
      >
        <MyComponent alt="img" class="mx-auto" :img="image.img" />
      </Starport>
    </div>
  </div>
</template>

<script lang="ts">
// Lib
import { computed, defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import { Starport } from 'vue-starport'

// Utils
import { ExampleOneData as images } from '../../data'

// Components
import MyComponent from '../../components/ExampleOne/MyComponent.vue'
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
    const id = route.params.id

    const image = computed(() => {
      const currentImage = images.filter((v) => v.id === id)[0]
      if (!currentImage) {
        return {
          id: 'default-id',
          img: 'https://images.unsplash.com/photo-1543364195-077a16c30ff3?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=512&ixid=MnwxfDB8MXxyYW5kb218MHw5NDczNDU2Nnx8fHx8fHwxNjQ4OTMyNDcw&ixlib=rb-1.2.1&q=80',
        }
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

<style></style>
