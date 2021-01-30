import {shallow} from "enzyme";
import {Main} from "./Main";
import {Banner} from "./Banner.jsx";
import {Hits} from "./Hits.jsx";
import {Catalogue} from "./Catalogue.jsx";

describe("Main component", () => {
  const wrapper = shallow(<Main/>);

  it("1. includes banner component", () => {
    expect(wrapper.contains(<Banner/>)).toEqual(true);
  })
  it("2. includes hits component", () => {
    expect(wrapper.contains(<Hits/>)).toEqual(true);
  })
  it("2. includes catalogue component", () => {
    expect(wrapper.contains(<Catalogue/>)).toEqual(true);
  })
});
