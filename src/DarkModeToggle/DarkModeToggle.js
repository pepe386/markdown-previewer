import React from 'react';
import ReactDOM from 'react-dom';
import './DarkModeToggle.css'

class CssStyleSheet extends React.Component {
    render() {
      return ReactDOM.createPortal(
          (<link rel="stylesheet" href={this.props.Css} type="text/css"></link>),
        document.head
      );
    }
  }

export default class DarkModeToggle extends React.Component {
    constructor(props) {
        super(props);
        let selectedOption = localStorage.getItem('DarkMode') === "true" ? true : false;
        this.state = {
            darkMode: selectedOption
        }
        this.setLightMode = this.setLightMode.bind(this);
        this.setDarkMode = this.setDarkMode.bind(this);
    }

    setLightMode(e) {
        this.setState({
          darkMode: false
        });
        localStorage.setItem('DarkMode', false);
      }

    setDarkMode(e) {
        this.setState({
            darkMode: true
        });
        localStorage.setItem('DarkMode', true);
    }

    render() {
        return (
            <div id="dark-mode-toggle" className="dark-mode-toggle">
                { this.state.darkMode && <CssStyleSheet Css={this.props.darkModeCss} />}
                { !this.state.darkMode && <CssStyleSheet Css={this.props.lightModeCss} />}
                <input type="radio" id="light" name="light" value="light" onChange={this.setLightMode} checked={!this.state.darkMode} />
                <label htmlFor="light">Light</label>
                <input type="radio" id="dark" name="dark" value="dark" onChange={this.setDarkMode} checked={this.state.darkMode} />
                <label htmlFor="dark">Dark&nbsp;</label>
            </div>
        );
    }
}
