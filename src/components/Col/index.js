import Col from './src/Col.vue'

Col.install = function(app) {
    app.use(Col.name, Col)
}

export default Col