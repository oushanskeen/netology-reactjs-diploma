import React from "react";
import { shallow } from "enzyme";
import { Catalogue } from "./Catalogue.jsx";
//import configureMockStore from "redux-mock-store";

const initState = {
  categories: ["All"],
  category: "All",
  offset: 0,
  isLoading: false,
  error: "",
  url: "http://localhost:7070/items",
  items: [],
  query: ""
};
const categoriesFullState = {
  ...initState,
  categories: ["All", "Men", "Women", "Unisex", "Kids"]
};

describe("Catalogue component:", () => {
  let useEffect;
  const mockUseEffect = () => useEffect.mockImplementationOnce(f => f());
  beforeEach(() => {
    useEffect = jest.spyOn(React, "useEffect");
    mockUseEffect();
    //mockUseEffect();
  });
  const wrapper = shallow(<Catalogue />);

  it("renders without crash", () => {
    shallow(<Catalogue />);
    //console.log(wrapper.debug());
  });
  it("includes categories bar", () => {
    //console.log(wrapper.debug());
    expect(wrapper.find("#categories")).toHaveLength(1);
    expect(wrapper.find("#itemsList")).toHaveLength(1);
    expect(wrapper.find("#moreButton")).toHaveLength(1);
  });

  describe("Categories component: ", () => {
    const getCategoriesMock = jest.fn();
    const setCategoryMock = jest.fn();

    it("renders only 'All' if no other categories available", () => {
      const localWrapper = shallow(<Catalogue state={{ ...initState }} />);
      expect(localWrapper.find("#categories").text()).toContain("All");
    });
    it("renders all categories to buttons if they are received", () => {
      const localWrapper = shallow(
        <Catalogue state={{ ...categoriesFullState }} />
      );
      ["All", "Men", "Women", "Unisex", "Kids"].map(e =>
        expect(localWrapper.find("#categories").text()).toContain(e)
      );
    });
    it("emits GET_CATEGORIES message on load", () => {
      const wrapper = shallow(
        <Catalogue
          state={{ ...initState }}
          onGetCategories={getCategoriesMock}
        />
      );
      expect(getCategoriesMock.mock.calls.length).toEqual(1);
    });
    it("emits 'CHOOSE_CATEGORY' message with category name action on relevant button click", () => {
      const wrapper = shallow(
        <Catalogue
          state={{ ...categoriesFullState }}
          onSetCategory={setCategoryMock}
        />
      );
      ["All", "Men", "Women", "Unisex", "Kids"].map(e => {
        wrapper.find(`#${e}`).simulate("click");
      });
      expect(setCategoryMock.mock.calls.length).toEqual(5);
    });
  });

  describe("ItemsList component:", () => {
    //const getItemsMock = jest.fn();

    it("renders load message if component is loading", () => {
      const wrapper = shallow(
        <Catalogue
          state={{...initState, isLoading:true}}
        />
      );
      expect(wrapper.find("#itemsList").text()).toContain("is loading");
    });
    it("renders error message if error received", () => {
      const wrapper = shallow(
        <Catalogue
          state={{...initState, error:"something is wrong"}}
        />
      );
      expect(wrapper.find("#itemsList").text()).toContain("something is wrong");
    });
    it("renders data if data is received", () => {
      const wrapper = shallow(
        <Catalogue
          state={{...initState, items:["item one", "item two"]}}
        />
      );
      expect(wrapper.find("#itemsList").text()).toContain("item one");
    });
  });

  describe("MoreItems button component", () => {
    it("is triggered on click", () => {
      const onMoreItemsMock = jest.fn();
      const wrapper = shallow(<Catalogue onMoreItems={onMoreItemsMock}/>);
      wrapper.find("#moreButton").simulate("click");
      expect(onMoreItemsMock.mock.calls.length).toEqual(1);
    });
  });
});
