import { getReview, getReviews, __cache as cache } from "./api";
// mock out fetch so it works client side
import "node-fetch-polyfill";
import nock from "nock";

describe("getReviews", () => {
  it("sends the api key", async () => {
    const scope = nock("//shakespeare.podium.co", {
      reqheaders: { Authorization: "abcd" }
    })
      .get("/api/reviews")
      .reply(200, []);

    const reviews = await getReviews();
    expect(reviews).toBe([]);
    expect(scope.isDone());
  });
});
