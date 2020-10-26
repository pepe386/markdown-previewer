import React from 'react';
import './App.css';
import InputBox from './InputBox';
import OutputBox from './OutputBox';
import DarkModeToggle from './DarkModeToggle/DarkModeToggle';
import GithubHeaderLink from './GithubHeaderLink/GithubHeaderLink';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: `# Markdown Preview
Write text on the black textbox and see real time how it looks on markdown format. Markdown is a text to html conversion format developed on 2004 by John Gruber and Aaron Swartz. See the [official Markdown website](https://daringfireball.net/projects/markdown)

## Examples:

### Code block
Some inline code \`<div></div>\`, and multiline code:

\`\`\`c
//c language code block

int i = 0;
\`\`\`

### Bold/Italic
**bold** _italic_. and **_both!_**

### Quotes
> Quoted text

### Tables

Column 1 | Column 2 | Column 3
------------ | ------------- | -------------
Row 1, C1 | Row 1, C2 | Row 1, C3
Row 2, C1 | Row 2, C2 | Row 2, C3

### Lists
Bullets:
- bullet 1
  - bulelet 2
    - bullet 3

Numbered:
1. one
1. two
1. three

### Image
![Markdown Logo](/markdown-previewer/markdown-192.png)

`
    }
    this.inputChange = this.inputChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.inputBoxRef = React.createRef();
  }

  inputChange(event) {
    this.setState({
      text: event.target.value
    });
  }

  onKeyDown = event => {
    if (event.keyCode === 9) {
        event.preventDefault();
        const { selectionStart, selectionEnd } = event.target;
        this.setState({
          text: this.state.text.substring(0, selectionStart) + "\t" + this.state.text.substring(selectionEnd)
          },
          () => {
            this.inputBoxRef.current.selectionStart = this.inputBoxRef.current.selectionEnd = selectionStart + 1;
          }
        );
    }
  };

  render() {
    return (
      <div className="App">
        <GithubHeaderLink href="//github.com/pepe386/markdown-previewer" />
        <DarkModeToggle lightModeCss="/markdown-previewer/App.css" darkModeCss="/markdown-previewer/App-dark.css" />
        <InputBox onChange={this.inputChange} value={this.state.text} ref={this.inputBoxRef} onKeyDown={this.onKeyDown} />
        <OutputBox value={this.state.text} />
      </div>
    );
  }
}

export default App;
