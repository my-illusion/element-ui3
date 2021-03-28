import { h, render, isVNode } from 'vue'

import messageComponent from './Message.vue'

const COMPONENT_CONTAINER_SYMBOL = Symbol('el_component_container')

const instanceList = []

function createComponent(Component, props, children) {
    const vnode = h(Component, { ...props, ref: 'el-component' }, children)
    const container = document.createElement('div')
    vnode[COMPONENT_CONTAINER_SYMBOL] = container
    render(vnode, container)
    return vnode.component
}

function createMessageComponentByOpts(opts) {
    if (isVNode(opts.message)) {
        return createComponent(messageComponent, opts, () => opts.message)
    }
    return createComponent(messageComponent, opts)
}

export function Message(opts) {
    return createMessage(mergeOpts(opts))
}

function mergeOpts(opts, type = "info") {
    const defaultOptions = {
        duration: 1000,
        type
    }

    if(typeof opts === 'string') {
        opts = {
            message: opts
        }
    }

    return Object.assign({}, defaultOptions, opts)
}

['info', 'success', 'warning', 'error'].forEach((type) => {
    Message[type] = (opts) => {
      return createMessage(mergeOpts(opts, type))
    }
})

function createMessage(opts) {
    const instance = createMessageComponentByOpts(opts)

    addInstance(instance)
    appendToBody(instance)
    return instance.proxy
}

function addInstance(instance) {
    instanceList.push(instance)
}

function appendToBody(instance) {
    document.body.appendChild(instance.vnode.el)
}