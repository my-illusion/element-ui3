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
            <slot>
                <el-icon name="caret-top"></el-icon>
            </slot>
        </div>
    </transition>
</template>

<script>
import { computed } from 'vue'
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
        const { visibilityHeight, target, right, bottom } = toRefs(props);
        const visible = ref(false);
        const styleBottom = computed(() => {
            return `${bottom.value}px`
        });
        const styleRight = computed(() => {
            return `${right.value}px`
        });

        return {
            styleBottom,
            styleRight,
            visible
        }
    }
}
</script>