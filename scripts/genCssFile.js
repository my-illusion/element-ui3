const fs = require('fs')
const path = require('path')

const componentPath = [
    path.resolve(__dirname, "../src/components")
]

const outputIndexPath = path.resolve(__dirname, "..", "./src/theme-chalk", "./index.scss")

;(function __main__() {
    // 合并所有组件下的scss文件到index.scss
    save(genCssCode(getAllComponentName()))
}())

function getAllComponentName() {
    return componentPath.map(
        componentPath => getComponentNameList(componentPath)
    )
    .reduce((total, components) => {
        return [...total, ...components]
    })
}

function getComponentNameList(componentPath) {
    return fs.readdirSync(componentPath)
        .map(componentName => {
                console.log(componentName)
                return componentName.charAt(0).toLocaleLowerCase() + componentName.slice(1) + `/style/index.scss`
            }
        )
}

function genCssCode(componentNameList) {
    const indexContent = ""
    return componentNameList.reduce((context, filePath) => {
        return (context += '@import "../components/' + filePath + '";\n')
    }, indexContent)
}

function save(cssCode){
    fs.writeFileSync(outputIndexPath, cssCode)
}