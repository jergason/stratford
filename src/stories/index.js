// @flow
import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";

import "bulma/css/bulma.css";
import ReviewSummary from "../ReviewSummary";

const review = {
  rating: 3.4,
  id: "beans",
  author: "Foo Bar",
  publish_date: "Some Date"
};

storiesOf("ReviewSummary", module).add("works", () => (
  <ReviewSummary review={review} />
));
