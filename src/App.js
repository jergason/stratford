import React, { Component } from "react";

import ReviewsTable from "./ReviewsTable";

import "bulma/css/bulma.css";

class App extends Component {
  render() {
    return (
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
        <div className="section">
          <ReviewsTable />
        </div>
      </div>
    );
  }
}

export default App;
