// @flow

import React, { Component } from "react";
import { Route } from "react-router-dom";
import { getReview } from "./api";
import { Review } from "./ReviewSummary";
import type { Review as ReviewT } from "./api";

export default function ReviewDetail() {
  return (
    <div>
      <Route path="/reviews/:id" component={SmartReview} />
      <Route
        exact
        path="/reviews"
        render={() => <div>Nothing to see here</div>}
      />
    </div>
  );
}

type Props = {
  match: {
    params: {
      id: string
    },
    url: string
  }
};

// workaround for setState not working with tagged unions (see https://github.com/facebook/flow/issues/3341)
type ActualState =
  | { status: "loading" }
  | { status: "loaded", review: ReviewT }
  | { status: "error", error: any };

type State = { union: ActualState };

class SmartReview extends Component<Props, State> {
  state = {
    union: {
      status: "loading"
    }
  };

  componentDidMount() {
    this.loadReview(this.props.match.params.id);
  }

  loadReview(id) {
    this.setState({ union: { status: "loading" } });
    getReview(id)
      .then(review => this.setState({ union: { status: "loaded", review } }))
      .catch(error => this.setState({ union: { status: "error", error } }));
  }

  componentWillReceiveProps(props: Props) {
    console.log("im getting called yo", {
      oldId: this.props.match.params.id,
      newId: props.match.params.id
    });
    this.loadReview(props.match.params.id);
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
      return <Review review={union.review} />;
    } else if (union.status === "error") {
      console.error(union.error);
      return (
        <div>
          <h2>Couldn't load the review for some reason?</h2>
          <p>{union.error.message}</p>
        </div>
      );
    }
  }

  render() {
    return <div className="column review-detail">{this.renderBody()}</div>;
  }
}
