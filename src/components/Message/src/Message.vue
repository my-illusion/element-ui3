<template>
    <transition name="el-message-fade" @after-leave="handleAfterLeave" appear>
        <div 
            v-if="isShow" 
            class="el-message"
            @mouseenter="handleMouseEnter"
            @mouseleave="handleMouseleave"
        >
            {{message}}
        </div>
    </transition>
</template>

<script>
import { ref, getCurrentInstance } from "vue"
export default {
      props: {
        message: {
            type: [String, Object]
        },
        type: {
            type: String,
            defalut: 'info',
            validator(val) {
                return ['success', 'warning', 'info', 'error'].includes(val)
            }
        },
        iconClass: String,
        showClose: Boolean,
        duration: Number,
        center: Boolean,
        customClass: String,
        dangerouslyUseHTMLString: Boolean,
        offset: Number
    },
    setup(props) {
        const instance = getCurrentInstance()

        const isShow = ref(true)

        const handleAfterLeave = () => {
            const parent = instance.vnode.el.parentElement
            if(parent) {
                parent.removeChild(instance.vnode.el)
            }
        }

        const handleMouseEnter = () => {
            clearTimeout(timer)
        }

        const handleMouseleave = () => {
            delayClose()
        }

        let timer

        function delayClose() {
            timer = setTimeout(() => {
                _close()
            }, props.duration)
        }

        function _close() {
            clearTimeout(timer)
            isShow.value = false
        }

        delayClose()

        return {
            isShow,
            handleAfterLeave,
            handleMouseEnter,
            handleMouseleave
        }
    }
}
</script>

<style scoped>
    .el-message-fade-enter-from,
    .el-message-fade-leave-to {
        opacity: 0;
        transform: translateX(-50%) translateY(-100%)!important;
    }

    .el-message-fade-enter-active,
    .el-message-fade-leave-active {
        transition: all .5s ease;
    }

    .el-message {
        position: fixed;
        left: 50%;
        top: 20px;
        transform: translateX(-50%) translateY(0);
    }
</style>