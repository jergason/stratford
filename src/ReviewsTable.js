// @flow
import React, { Component } from "react";

import { getReviews } from "./api";
import ReviewSummary from "./ReviewSummary";
import type { ReviewSummary as ReviewSummaryT } from "./api";

// workaround for setState not working with tagged unions (see https://github.com/facebook/flow/issues/3341)
type ActualState =
  | { status: "loading" }
  | { status: "loaded", reviews: Array<ReviewSummaryT> }
  | { status: "error", error: any };

type State = { union: ActualState };

type Props = {
  reviewSelected: (id: string) => void
};

class ReviewsTable extends Component<Props, State> {
  state = {
    union: {
      status: "loading"
    }
  };

  componentDidMount() {
    console.log("geting reviews!");
    getReviews()
      .then(reviews => {
        console.log("got my reviews yo", reviews);
        this.setState({ union: { status: "loaded", reviews } });
      })
      .catch(error => {
        console.error(error);
        this.setState({ union: { status: "error", error } });
      });
  }

  renderBody() {
    const { union } = this.state;
    if (union.status === "loading") {
      return (
        <div className="loading">
          Loading <span>.</span>
          <span>.</span>
          <span>.</span>
        </div>
      );
    } else if (union.status === "loaded") {
      return (
        <div>
          {union.reviews.map(r => <ReviewSummary key={r.id} review={r} />)}
        </div>
      );
    } else if (union.status === "error") {
      return (
        <div>
          <h2>Oh dang, something went wrong:</h2>
          <p>{union.error.message}</p>
        </div>
      );
    }
  }

  render() {
    return <div className="column">{this.renderBody()}</div>;
  }
}

export default ReviewsTable;
