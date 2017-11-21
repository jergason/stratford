// @flow
import React from "react";
import format from "date-fns/format";
import { NavLink } from "react-router-dom";
import type { ReviewSummary as ReviewSummaryT, Review as ReviewT } from "./api";

function Rating({ rating }) {
  return (
    <div>
      <strong>{rating} out of 5</strong>
    </div>
  );
}

// export for testing
export function Byline({ author, publish_date }: $Shape<ReviewT>) {
  let date = format(publish_date, "MMM. Do, YYYY");
  if (date === "Invalid Date") {
    date = "";
  }

  return (
    <div className="byline">
      <p>
        By <span className="author is-uppercase">{author}</span>
      </p>
      <p>
        <span className="date is-uppercase">{date}</span>
      </p>
    </div>
  );
}

export function ReviewSummary(props: { review: ReviewSummaryT }) {
  const { rating, publish_date, id, author } = props.review;
  return (
    <article className="review-summary">
      <Rating rating={rating} />
      <Byline author={author} publish_date={publish_date} />
      <NavLink to={`/reviews/${id}`}>Read Review</NavLink>
    </article>
  );
}

export function Review(props: { review: ReviewT }) {
  const { rating, publish_date, author, body } = props.review;
  return (
    <article className="review">
      <h2 className="title is-3">Featured Review</h2>
      <Rating rating={rating} />
      <Byline author={author} publish_date={publish_date} />
      <p>{body}</p>
    </article>
  );
}
