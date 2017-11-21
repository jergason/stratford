import React from "react";
import ReactDOM from "react-dom";
import enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import App from "./App";
import "node-fetch-polyfill";

enzyme.configure({ adapter: new Adapter() });

it("renders without crashing", () => {
  const wrapper = shallow(<App />);
});
