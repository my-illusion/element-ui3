import Col from './src/Col.vue'

Col.install = function(app) {
    app.component(Col.name, Col)
}

export default Col