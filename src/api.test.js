// @flow
import { getReview, getReviews, __emptyCache } from "./api";
// mock out fetch so it works client side
import fetch from "node-fetch-polyfill";
import nock from "nock";

global.fetch = fetch;

describe("getReviews", () => {
  beforeEach(__emptyCache);
  const fakeReviews = [
    {
      foo: "bar"
    }
  ];

  it("hits the api", async () => {
    const scope = nock("https://shakespeare.podium.co")
      .get("/api/reviews")
      .reply(200, { data: fakeReviews });

    const reviews = await getReviews();
    expect(reviews).toEqual(fakeReviews);
    expect(scope.isDone());
  });

  it("doesn't hit the api if the reviews have been fetched already", async () => {
    const scope = nock("https://shakespeare.podium.co")
      .get("/api/reviews")
      .reply(200, { data: fakeReviews });

    const reviews = await getReviews();
    expect(scope.isDone());

    const newScope = nock("https://shakespeare.podium.co")
      .get("/api/reviews")
      .reply(200, { data: fakeReviews });
    await getReviews();
    expect(!newScope.isDone());
    // clean up our scope so it doesnt mess with other tests
    nock.cleanAll();
  });
});

describe("getReview", () => {
  beforeEach(__emptyCache);
  const fakeReview = {
    foo: "bar"
  };
  const id = "123";

  it("hits the api", async () => {
    const scope = nock("https://shakespeare.podium.co")
      .get(`/api/reviews/${id}`)
      .reply(200, { data: fakeReview });

    const review = await getReview(id);
    expect(review).toEqual(fakeReview);
    expect(scope.isDone());
  });

  it("doesn't hit the api if the reviews have been fetched already", async () => {
    const scope = nock("https://shakespeare.podium.co")
      .get(`/api/reviews/${id}`)
      .reply(200, { data: fakeReview });

    const reviews = await getReview(id);
    expect(scope.isDone());

    const newScope = nock("https://shakespeare.podium.co")
      .get(`/api/reviews/${id}`)
      .reply(200, { data: fakeReview });
    await getReview(id);
    expect(!newScope.isDone());
    // clean up our scope so it doesnt mess with other tests
    nock.cleanAll();
  });
});
