import Breadcrumb from './src/Breadcrumb.vue'

Breadcrumb.install = function (app) {
    app.component(Breadcrumb.name, Breadcrumb)
}

export default Breadcrumb