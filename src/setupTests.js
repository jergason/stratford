import enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import fetch from "node-fetch-polyfill";

enzyme.configure({ adapter: new Adapter() });

// we need to override the built in fetch so nock can catch our requests
global.fetch = fetch;
