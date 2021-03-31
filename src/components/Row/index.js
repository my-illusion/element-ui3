import Row from './src/Row.js'

Row.install = function(app) {
    app.use(Row.name, Row)
}

export default Row