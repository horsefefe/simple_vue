// http://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module',
    },
    env: {
        browser: true,
    },
    // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
    extends: 'standard',
    // required to lint *.vue files
    plugins: ['html', 'vue'],
    // add your custom rules here
    rules: {
        // allow paren-less arrow functions
        'arrow-parens': 0,
        // allow async-await
        'generator-star-spacing': 0,
        'space-before-function-paren': 0,
        'eol-last': 0,
        'prefer-promise-reject-errors': 0,
        indent: ['error', 4],
        semi: ['error', 'always'],
        'no-new-func': 0,
        // camelcase: [2, { properties: 'always' }],
        // allow debugger during development
        camelcase: [0, { properties: 'never' }],
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    },
};
