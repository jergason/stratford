// @flow

const cache = {};

type Data<T> = {
  data: T
};

export type ReviewSummary = {
  rating: number,
  publish_date: string,
  id: string,
  author: string
};

export type Review = {
  body: string
} & ReviewSummary;

// in a real app I'd paramaterize this instead of hardcode it
// but as somebody said
// the course of true love never did run smooth
const API_KEY = "koOheljmQX";
const headers = {
  Authorization: API_KEY
};

function fetchReviews(): Promise<Array<ReviewSummary>> {
  return fetch("//shakespeare.podium.co/api/reviews", { headers })
    .then(res => res.json())
    .then((reviews: Data<Array<ReviewSummary>>) => {
      return reviews.data;
    });
}

function fetchReview(id): Promise<Review> {
  return fetch(`//shakespeare.podium.co/api/reviews/${id}`, { headers })
    .then(res => res.json())
    .then((review: Data<Review>) => {
      return review.data;
    });
}

export async function getReviews(): Promise<Array<ReviewSummary>> {
  // don't re-fetch reviews
  if (cache.reviewSummaries) {
    return cache.reviewSummaries;
  }

  const reviews = await fetchReviews();
  cache.reviewSummaries = reviews;
  return reviews;
}

export async function getReview(id: string): Promise<Review> {
  if (cache.reviews[id]) {
    return cache.reviews[id];
  }

  const review = await fetchReview(id);
  cache.reviews[id] = review;
  return review;
}
