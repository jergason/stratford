// @flow
import React from "react";
import { shallow } from "enzyme";
import { Byline } from "./Review";

const review = {
  rating: 3.2,
  publish_date: "2016-09-04T23:25:47.642388Z",
  id: "9793364045824",
  body: "Can one desire too much of a good thing?.",
  author: "Fay Lemke"
};

describe("Byline", () => {
  it("formats the date correclly", () => {
    const date = shallow(
      <Byline author={review.author} publish_date={review.publish_date} />
    ).find("span.date");
    // expect the date to be an empty span
    expect(date.text()).toBe("Sep. 4th, 2016");
  });

  it("renders an empty string for a date if the date is invalid", () => {
    const date = shallow(
      <Byline author={review.author} publish_date={"lol not a real date"} />
    ).find("span.date");

    expect(date.text()).toBe("");
  });
});
