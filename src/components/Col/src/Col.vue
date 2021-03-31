<script>
import { computed, getCurrentInstance, toRefs, unref, h } from 'vue'
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

        // const parentRow = inject("row")

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
                    classList.push(
                        prop !== 'span'
                        ? `el-col-${prop}-${unref(toRefs(props)[prop])}`
                        : `el-col-${unref(toRefs(props)[prop])}`
                    )
                }
            })

            ;['xs', 'sm', 'md', 'lg', 'xl'].forEach((size) => {
                if (typeof unref(toRefs(props)[size]) === 'number') {
                    classList.push(`el-col-${size}-${unref(toRefs(props)[size])}`)
                } else if (typeof unref(toRefs(props)[size]) === 'object') {
                    const propsData = unref(toRefs(props)[size])
                    Object.keys(propsData).forEach((prop) => {
                        classList.push(
                        prop !== 'span'
                            ? `el-col-${size}-${prop}-${propsData[prop]}`
                            : `el-col-${size}-${propsData[prop]}`
                        )
                    })
                }
            })

            return h(
                unref(tag),
                {
                    class: ['el-col', classList],
                    style
                },
                slots.default ? slots.default() : ''
            )
        }
    }
}
</script>