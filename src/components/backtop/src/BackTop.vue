<template>
    <transition name="el-fade-in">
        <div
            v-if="visible"
            @click.stop="handleClick"
            :style="{
                right: styleRight,
                bottom: styleBottom
            }"
            class="el-backtop"
        >
            <slot></slot>
        </div>
    </transition>
</template>

<script>
import { computed, toRefs, ref, onMounted, onUnmounted } from 'vue'
import { throttle } from 'throttle-debounce'

const cubic = (value) => Math.pow(value, 3)
const easeInOutCubic = (value) =>
  value < 0.5 ? cubic(value * 2) / 2 : 1 - cubic((1 - value) * 2) / 2

export default {
    name: 'BackTop',
    props: {
        visibilityHeight: {
        type: Number,
        default: 200
        },
        target: {
        type: String,
        default: null
        },
        right: {
        type: Number,
        default: 40
        },
        bottom: {
        type: Number,
        default: 40
        }
    },
    setup(props) {
        const el = ref(null)
        const container = ref(null)
        const visible = ref(false)
        let throttledScrollHandler

        const { visibilityHeight, target, right, bottom } = toRefs(props)

        const init = () => {
            container.value = document
            el.value = document.documentElement

            if(target.value) {
                container.value = document.querySelector(target.value)
                if (!container.value) {
                    throw new Error(`target is not existed: ${target.value}`)
                }
                el.value = container.value
            }
        }

        const onScroll = () => {
            const scrollTop = el.value.scrollTop
            visible.value = scrollTop >= visibilityHeight.value
        }

        const handleClick = () => {
            scrollToTop()
        }

        const scrollToTop = () => {
            const element = el.value
            const beginTime = Date.now()
            const beginValue = element.scrollTop
            const rAF =
                window.requestAnimationFrame || ((func) => setTimeout(func, 16))
            const frameFunc = () => {
                const progress = (Date.now() - beginTime) / 500
                if (progress < 1) {
                    element.scrollTop = beginValue * (1 - easeInOutCubic(progress))
                    rAF(frameFunc)
                } else {
                    element.scrollTop = 0
                }
            }
            rAF(frameFunc)
        }

        onMounted(() => {
            init()
            throttledScrollHandler = throttle(300, onScroll)
            container.value.addEventListener('scroll', throttledScrollHandler)
        })

        onUnmounted(() => {
            container.value.removeEventListener('scroll', throttledScrollHandler)
        })
        
        const styleBottom = computed(() => {
            return `${bottom.value}px`
        });
        const styleRight = computed(() => {
            return `${right.value}px`
        });

        return {
            styleBottom,
            styleRight,
            visible,
            handleClick
        }
    }
}
</script>