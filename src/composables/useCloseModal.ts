import { useRouter } from 'vue-router'
import { onBeforeMount, onBeforeUnmount } from 'vue'

const useCloseModal = () => {
  const router = useRouter()

  const onClose = () => {
    router.back()
  }

  const onEsc = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose()
    }
  }

  onBeforeMount(() => {
    window.addEventListener('keyup', onEsc)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('keyup', onEsc)
  })

  return {
    onClose,
  }
}


export default useCloseModal