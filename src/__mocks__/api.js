const review = {
  rating: 3.2,
  publish_date: "2016-09-04T23:25:47.642388Z",
  id: "9793364045824",
  body: "Can one desire too much of a good thing?.",
  author: "Fay Lemke"
};

let shouldFail = false;
export function setShouldFail(a) {
  shouldFail = a;
}

export function getReview() {
  return new Promise((res, rej) =>
    process.nextTick(
      () =>
        shouldFail
          ? rej(new Error("Hell is empty and all the devils are here."))
          : res(review)
    )
  );
}
