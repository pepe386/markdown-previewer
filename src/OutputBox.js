import React from 'react';
import DOMPurify from 'dompurify';

function createMarkup(marked, value) {
    //use marked function to return markdown encoded text
    marked.setOptions({
        highlight: function(code, language) {
            const hljs = require('highlight.js');
            const validLanguage = hljs.getLanguage(language) ? language : 'plaintext';
            return hljs.highlight(validLanguage, code).value;
        },
        breaks: true
    });
    let markdownText = marked(value);

    //replace newlines with <br> inside code tags
    let codeTagArray = markdownText.match(/<code(.*?)>(.*?)<\/code>/gs);
    if (Array.isArray(codeTagArray)) {
        for (let i= 0; i < codeTagArray.length; i++) {
            markdownText = markdownText.replaceAll(codeTagArray[i], codeTagArray[i].replace(/(?:\r\n|\r|\n)/g, "<br>"));
        }
    }

    //remove newlines from html code
    markdownText = markdownText.replace(/(?:\r\n|\r|\n)/g, '');
    //console.log(markdownText);

    //sanitize before html output
    markdownText = DOMPurify.sanitize(markdownText);

    return {__html: markdownText};
}

export default class OutputBox extends React.Component {
    render() {
        return (
            <div id="output-box">
                <div id="preview" dangerouslySetInnerHTML={createMarkup(window.marked, this.props.value)} />
            </div>
        );
    }
}
