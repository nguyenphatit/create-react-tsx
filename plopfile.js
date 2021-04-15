module.exports = function (plop) {
    plop.setGenerator('component', {
        description: 'Create a component',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'Component name'
            }
        ],
        actions: [
            {
                type: 'add',
                path: 'src/components/{{name}}/index.tsx',
                templateFile: 'templates/Component.tsx.hbs'
            }
        ]
    })
}