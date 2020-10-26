import React from 'react';

function escapeHtml(unsafe) {
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
}

function createMarkup(marked, value) {
    //escape input text (html)
    let safeHtml = escapeHtml(value);

    //decode ">" character so that blockquotes are detected
    let blockQuotesArray = safeHtml.match(/(\n|\r|\r\n)(&gt;)(.*)|^(&gt;)(.*)/g);
    if (Array.isArray(blockQuotesArray)) {
        //console.log(blockQuotesArray);
        for (let i= 0; i < blockQuotesArray.length; i++) {
            if (blockQuotesArray[i][0] === "\n") {
                safeHtml = safeHtml.replaceAll(blockQuotesArray[i], "\n>" + blockQuotesArray[i].substring(5));
            }
            else {
                safeHtml = safeHtml.replaceAll(blockQuotesArray[i], ">" + blockQuotesArray[i].substring(5));
            }
        }
    }

    //html decode text betweem backticks
    let codeArray = safeHtml.match(/`(.*?)`/g);
    let he = require('he');
    if (Array.isArray(codeArray)) {
        for (let i= 0; i < codeArray.length; i++) {
            safeHtml = safeHtml.replaceAll(codeArray[i], he.decode(codeArray[i]));
        }
    }

    //html decode text betweem triple backticks
    codeArray = safeHtml.match(/```(.*?)```/gs);
    if (Array.isArray(codeArray)) {
        for (let i= 0; i < codeArray.length; i++) {
            safeHtml = safeHtml.replaceAll(codeArray[i], he.decode(codeArray[i]));
        }
    }

    //use marked function to return markdown encoded text
    marked.setOptions({
        highlight: function(code, language) {
            const hljs = require('highlight.js');
            const validLanguage = hljs.getLanguage(language) ? language : 'plaintext';
            return hljs.highlight(validLanguage, code).value;
        },
        breaks: true
    });
    let markdownText = marked(safeHtml);

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
