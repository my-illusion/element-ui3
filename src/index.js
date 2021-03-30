import BackTop from './components/BackTop'

const components = [
    BackTop
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
    BackTop
};

export default element3;