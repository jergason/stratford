// @flow

import React, { Component } from "react";
import type { Review as ReviewT } from "./api";

type Props = {
  review: ReviewT
};

export default class Review extends Component<Props> {
  render() {
    return (
      <div>
        YAHOO I AM A REVIEW
        <br />
        {this.props.review.id}
      </div>
    );
  }
}
