import Vue from 'vue'
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { RouteRecordName } from 'vue-router'

type RouteNameType = RouteRecordName | null | undefined

export interface ComponentScrollPosition extends Vue.ComponentPublicInstance {
  fromRoute: RouteNameType
}

const useScrollPosition = ({
  component,
  storageName,
  scrollPosition,
}: {
  component: string
  storageName: string
  scrollPosition: 'scrollTop' | 'scrollLeft'
}) => {
  onMounted(() => {
    nextTick(() => {
      saveScrollPosition()
    })
  })

  onBeforeUnmount(() => {
    saveScrollPosition({
      onDestroy: true,
    })
  })

  const fromRoute = ref<RouteNameType>(null)

  const saveScrollPosition = (
    { onDestroy } = {
      onDestroy: false,
    }
  ) => {
    let sidebar = document.querySelector(component)
    let top = localStorage.getItem(storageName)

    if (sidebar === null) {
      return
    }

    if (!onDestroy && fromRoute.value) {
      sidebar[scrollPosition] = Number(top)
    }

    localStorage.setItem(storageName, String(sidebar![scrollPosition]))
  }

  return {
    fromRoute,
  }
}

export default useScrollPosition
