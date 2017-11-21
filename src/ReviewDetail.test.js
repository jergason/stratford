// @flow
jest.mock("./api");
/* eslint-disable import/first */
import React from "react";
import { shallow } from "enzyme";
import { SmartReview } from "./ReviewDetail";

// load our mocked version so we can wait until async work is done
// $FlowFixMe
import { getReview, setShouldFail } from "./api";

const mockProps = {
  match: { params: { id: "1" } }
};

it("renders in a loading state", () => {
  // don't fire off lifecycle methods os we can just test initial state
  const detail = shallow(<SmartReview {...mockProps} />, {
    disableLifecycleMethods: true
  });

  expect(detail.state("union")).toEqual({ status: "loading" });
});

it("renders a review when the api request succeeds", () => {
  setShouldFail(false);
  const detail = shallow(<SmartReview {...mockProps} />);

  return getReview("whatever").then(() =>
    expect(detail.state("union")).toMatchObject({ status: "loaded" })
  );
});

function sleep(duration) {
  return new Promise(res => setTimeout(res, duration));
}

it("renders an error state when the api request errors", async () => {
  setShouldFail(true);
  const detail = shallow(<SmartReview {...mockProps} />);
  let didThrow = false;
  try {
    await getReview("whatever");
  } catch (e) {
    didThrow = true;
    // wait a tick until setState has resolved
    await sleep(1);
    expect(detail.state("union")).toMatchObject({ status: "error" });
  }
  expect(didThrow).toBe(true);
});
