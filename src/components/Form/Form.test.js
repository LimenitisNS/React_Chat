import React from "react";
import { shallow } from "enzyme";
import Form from "./Form";

describe("Form", () => {
  test("runs callback with proper values", () => {
    const message = "Message";
    const handler = jest.fn();
    const component = shallow(<Form />);

    component.find("id='content'").simulate("change", { target: { value: message } });
    component.find("button[type='submit']").simulate("click");
    expect(handler).toHaveBeenCalledWith({
      message: message
    });
  });
});
