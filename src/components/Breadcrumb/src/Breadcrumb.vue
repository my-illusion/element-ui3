<template>
    <div
        ref="root"
        class="el-breadcrumb"
        aria-label="Breadcrumb"
        role="navigation"
    >
        <slot></slot>
    </div>
</template>

<script>
import { onMounted, provide, toRefs } from 'vue'
export default {
    name: 'Breadcrumb',
    props: {
        separator: {
            type: String,
            default: '/'
        },
        separatorClass: {
            type: String,
            default: ''
        }
    },
    setup(props) {
        const { separator, separatorClass } = toRefs(props)
        provide("separator", separator)
        provide("separatorClass", separatorClass)

        const root = ref(null)

        onMounted(() => {
            const items = root.value.querySelectorAll('.el-breadcrumb__item')
            if (items.length) {
                items[items.length - 1].setAttribute('aria-current', 'page')
            }
        })

        return {
            root
        }
    }
}
</script>