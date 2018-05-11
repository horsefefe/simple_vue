const fs = require('fs');
const path = require('path');
const less = require('less');
const vueParser = require('vue-parser');
const compiler = require('vue-template-compiler');
const Handlebars = require('handlebars');
const dir_path = path.resolve(__dirname, '../test/src/components');
const camelCase = require('camelcase');
fs.readdirSync(dir_path).forEach(file => {
    generate_template(file);
});
function generate_template(fileName) {
    let temp_path = path.resolve(dir_path, fileName);
    let str = fs.readFileSync(temp_path).toString('utf8');
    let js_str = vueParser.parse(str, 'script');
    let less_str = vueParser.parse(str, 'style');
    if (less_str) {
        less
            .render(less_str, { filename: path.resolve(temp_path) })
            .then(output => {
                gen_js(fileName, js_str, str, output);
            })
            .catch(data => {
                console.log(data);
            });
    } else {
        gen_js(fileName, js_str, str, {});
    }
}
function gen_js(fileName, js_str, str, output) {
    const template_str = vueParser.parse(str, 'template');
    const config_obj = compiler.compile(template_str);
    const template_dir = path.resolve(__dirname, '../gen_vue_class');
    js_str = js_str.replace('export default', 'const $options =');
    // fs.writeFileSync(path.resolve(template_dir, "options", "Form.js"), js_str);
    const hbs_str = fs.readFileSync(path.resolve(__dirname, './template.js')).toString('utf8');
    const template = Handlebars.compile(hbs_str);
    let name = camelCase(fileName.split('.')[0]);
    name = name[0].toUpperCase() + name.substr(1);
    config_obj.name = name;
    config_obj.slot = js_str;
    config_obj.css = output.css;
    const final_html = template(config_obj);
    fs.writeFileSync(path.resolve(template_dir, '../dist', `${name}.js`), final_html);
}
