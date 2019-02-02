import React, { Component } from 'react';

export default class Footer extends Component {
  render() {
    return (

        <footer>
          <span className="footer-link"><a href="https://sarahphillipsdev.surge.sh">by Sarah Phillips </a></span>
          <span className="footer-link"><a href="https://github.com/snphillips/todoodles"><i className="fab fa-github"></i></a></span>
        </footer>
    );
  }
}
