// @flow
import { getReview, getReviews, __emptyCache } from "./api";
import fetch from "node-fetch-polyfill";
import nock from "nock";

// we need to override the built in fetch so nock can catch our requests
global.fetch = fetch;

beforeEach(__emptyCache);
afterEach(() => nock.cleanAll());
const HOST = "http://shakespeare.podium.co";
describe("getReviews", () => {
  const fakeReviews = [
    {
      foo: "bar"
    }
  ];

  it("hits the api", async () => {
    const scope = nock(HOST)
      .get("/api/reviews")
      .reply(200, { data: fakeReviews });

    const reviews = await getReviews();
    expect(reviews).toEqual(fakeReviews);
    expect(scope.isDone());
  });

  it("doesn't hit the api if the reviews have been fetched already", async () => {
    const scope = nock(HOST)
      .get("/api/reviews")
      .reply(200, { data: fakeReviews });

    const reviews = await getReviews();
    expect(scope.isDone());

    const newScope = nock(HOST)
      .get("/api/reviews")
      .reply(200, { data: fakeReviews });
    await getReviews();
    expect(!newScope.isDone());
  });
});

describe("getReview", () => {
  const fakeReview = {
    foo: "bar"
  };
  const id = "123";

  it("hits the api", async () => {
    const scope = nock(HOST)
      .get(`/api/reviews/${id}`)
      .reply(200, { data: fakeReview });

    const review = await getReview(id);
    expect(review).toEqual(fakeReview);
    expect(scope.isDone());
  });

  it("doesn't hit the api if the reviews have been fetched already", async () => {
    const scope = nock(HOST)
      .get(`/api/reviews/${id}`)
      .reply(200, { data: fakeReview });

    const reviews = await getReview(id);
    expect(scope.isDone());

    const newScope = nock(HOST)
      .get(`/api/reviews/${id}`)
      .reply(200, { data: fakeReview });
    await getReview(id);
    expect(!newScope.isDone());
  });
});
