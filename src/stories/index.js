// @flow
import React from "react";

import { storiesOf } from "@storybook/react";
import { MemoryRouter as Router } from "react-router-dom";

import "bulma/css/bulma.css";
import { ReviewSummary, Review } from "../ReviewSummary";

const review = {
  rating: 3.4,
  id: "beans",
  author: "Foo Bar",
  publish_date: "Some Date"
};

const fullReview = {
  ...review,
  body: "What an amazing play"
};

storiesOf("ReviewSummary", module).add("works", () => (
  <Router>
    <ReviewSummary review={review} />
  </Router>
));

storiesOf("Review", module).add("works", () => <Review review={fullReview} />);
