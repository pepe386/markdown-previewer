import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { Link, BrowserRouter } from 'react-router-dom';


export default class GithubHeaderLink extends React.Component {
    render() {
      const divStyle = {
        position: "absolute",
        top: "2vh",
        left: "50%",
        transform: "translateX(-50%)"
      };
      return (
        <div style={divStyle}>
          <BrowserRouter>
            <Link to={this.props.href} target="_blank" className="github-header-link">
              <FontAwesomeIcon icon={faGithub} size="2x" />
            </Link>
          </BrowserRouter>
        </div>
      );
    }
}
