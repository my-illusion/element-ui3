<template>
  <span :style="style" :class="classes">
    222
  </span>
</template>

<script>
import { computed, onBeforeMount, toRefs } from 'vue'

import { isNumber } from '../../../utils/types'

import { props } from './props'

export default {
    name: 'Avator',
    props,
    setup(props) {
      onBeforeMount(() => {
        console.log(222)
      })

      const { size } = toRefs(props)

      const style = useStyle(size)

      return {
        style
      }
    }
}

const useStyle = (size) => {
  if (!isNumber(size.value)) {
    return {}
  }
  return computed(() => {
    return {
      lineHeight: `${size.value}px`,
      height: `${size.value}px`,
      width: `${size.value}px`
    }
  })
}
</script>