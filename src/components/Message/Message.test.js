import React from "react";
import { shallow } from "enzyme";
import Message from "./Message";
import renderer from "react-test-renderer";

describe("Message", () => {
  test("Message shows nick and message", () => {
    const message = "test";
    const nikname = "test";
    const component = shallow(<Message content={message} nickname={nikname} />);
    expect(component.text()).toContain(message);
  });

  test("Snaphot", () => {
    const message = "test";
    const component = renderer.create(<Message message={message} />);
    let componentSnapshot = component.toJSON();
    expect(componentSnapshot).toMatchSnapshot();
  });
});
