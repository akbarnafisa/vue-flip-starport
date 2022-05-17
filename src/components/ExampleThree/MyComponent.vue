<template>
  <img alt="img" :src="img" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    img: {
      require: true,
      type: String,
    },
  },
})
</script>
