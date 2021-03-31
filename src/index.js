import BackTop from './components/Backtop'
import Row from './components/Row'
import Col from './components/Col'

const components = [
    BackTop,
    Row,
    Col
];

function install(app) {
    components.forEach(component => {
        app.use(component)
    })
}

const element3 = {
    install,
    versions: "0.0.1"
};

export {
    BackTop,
    Row,
    Col
};

export default element3;