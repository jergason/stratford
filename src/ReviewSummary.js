// @flow
import React, { Component } from "react";
import format from "date-fns/format";
import { Link } from "react-router-dom";
import type { ReviewSummary as ReviewSummaryT } from "./api";

type Props = {
  review: ReviewSummaryT
};

function Title({ rating }) {
  return (
    <div>
      <h3>{rating} out of 5</h3>
    </div>
  );
}

function Byline({ author, publish_date }) {
  let date = format(publish_date, "MMM. Do, YYYY");
  if (date === "Invalid Date") {
    date = "";
  }

  return (
    <div className="byline">
      <p>
        By <span className="author">{author}</span>
      </p>
      <p>
        <span className="date">{date}</span>
      </p>
    </div>
  );
}

export default class ReviewSummary extends Component<Props> {
  render() {
    const { rating, publish_date, id, author } = this.props.review;
    return (
      <article>
        <Title rating={rating} />
        <Byline author={author} publish_date={publish_date} />
        <Link to={`/reviews/${id}`}>Review</Link>
      </article>
    );
  }
}
