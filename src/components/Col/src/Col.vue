<script>
import { computed, getCurrentInstance, toRefs, unref } from 'vue'
const propsList = ['span', 'offset', 'pull', 'push']
export default {
    name: 'Col',
    props: {
        span: {
            type: Number,
            default: 24
        },
        tag: {
            type: String,
            default: 'div'
        },
        offset: Number,
        pull: Number,
        push: Number,
        xs: [Number, Object],
        sm: [Number, Object],
        md: [Number, Object],
        lg: [Number, Object],
        xl: [Number, Object]
    },
    setup(props, { slots }){
        const { tag } = toRefs(props)
        // 获取父组件Row的gutter属性
        const gutter = computed(() => {
            let { parent } = getCurrentInstance()
            while(parent && parent.type.componentName !== 'Row'){
                parent = parent.parent
            }
            return parent ? unref(parent.props.gutter) : 0
        })

        return () => {

            const style = {}
            const classList = []

            if (gutter) {
                style.paddingLeft = gutter / 2 + 'px'
                style.paddingRight = style.paddingLeft
            }

            propsList.forEach(prop => {
                const propValue = unref(toRefs(props)[prop])
                if(propValue || propValue === 0) {
                    classList.push()
                }
            })

            return h(
                unref(tag),
                {
                    class: [],
                    style
                },
                slots.default ? slots.default() : ''
            )
        }
    }
}
</script>