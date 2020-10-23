import React from "react";
import { shallow } from "enzyme";
import Message from "./Message";
import renderer from "react-test-renderer";

describe("Message", () => {
  test("Message shows nick and message", () => {
    const nick = "test";
    const message = "test";
    const component = shallow(<Message nick={nick} message={message} />);
    expect(component.text()).toContain(nick);
    expect(component.text()).toContain(message);
  });

  test("Snaphot", () => {
    const message = "test";
    const component = renderer.create(<Message message={message} />);
    let componentSnapshot = component.toJSON();
    expect(componentSnapshot).toMatchSnapshot();
  });
});
