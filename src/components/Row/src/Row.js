import { computed, render } from "vue"

import { computed, provide, getCurrentInstance } from 'vue'

export default {
    name: 'Row',
    componentName: 'Row',
    props: {
        tag: {
            type: String,
            default: 'div'
        },
        gutter: {
            type: Number,
            default: 0
        },
        type: String,
        justify: {
            type: String,
            default: 'start'
        },
        align: {
            type: String,
            default: 'top'
        }
    },
    setup(props) {
        const style = computed(() => {
            const result = {}
            if(props.gutter) {
                result.marginLeft = `-${gutter}px`
                result.marginRight = result.marginLeft
            }
            return result
        })

        provide("row", getCurrentInstance())

        return {
            style
        }
    },
    render(h){
        return (
            this.tag,
            {
                class: [
                    'el-row',
                    this.justify !== 'start' ? `is-justify-${this.justify}` : '',
                    this.align !== 'top' ? `is-align-${this.align}` : '',
                    { 'el-row--flex': this.type === 'flex' }
                ],
                style: this.style
            },
            this.$slots.default && this.$slots.default()
        )
    }
}