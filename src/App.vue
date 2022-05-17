<template>
  <div>
    <StarportCarrier>
      <RouterView v-slot="{ Component }">
        <transition name="page-fade">
          <component :is="Component" class="absolute left-0 right-0 top-0" />
        </transition>
      </RouterView>
    </StarportCarrier>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { StarportCarrier } from 'vue-starport'

export default defineComponent({
  components: {
    StarportCarrier,
  },
})
</script>
