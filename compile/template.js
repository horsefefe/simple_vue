import Component from '../core/Component';
{{{slot}}}
class {{{name}}} extends Component {
    constructor(props) {
        super($options, props);
    }
}
{{{name}}}.isAppendStyle = false;
{{{name}}}.prototype.renderDom = new Function(`{{{render}}}`);
{{#if staticRenderFns}}
const staticRenderFns = [];
{{#each staticRenderFns}}
staticRenderFns.push(new Function(`{{{this}}}`));
{{/each}}
{{{name}}}.prototype.staticRenderFns = staticRenderFns;
{{/if}}
{{#if css}}
{{{name}}}.prototype.style = `{{{css}}}`;
{{/if}}
export default {{{name}}};
