import React, { Component } from "react";

import { BrowserRouter as Router } from "react-router-dom";
import ReviewsTable from "./ReviewsTable";
import ReviewDetail from "./ReviewDetail";

import "bulma/css/bulma.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="section">
          <header className="hero">
            <div className="hero-body">
              <div className="container">
                <h1 className="title">The Stratford Times</h1>
                <h2 className="subtitle">
                  All The Reviews That Are Fit To Print
                </h2>
              </div>
            </div>
          </header>
          <div className="section columns">
            <ReviewsTable />
            <ReviewDetail />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
