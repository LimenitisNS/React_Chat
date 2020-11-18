import React from "react";
import { shallow } from "enzyme";
import Form from "./Form";

describe("Form", () => {
  test("runs callback with proper values", () => {
    const message = "Message";
    const nickname = "Nick";
    const handler = jest.fn();
    const component = shallow(<Form handleSubmit={handler} />);
    expect(
      component.find("input[type='text']").simulate("change", { target: { value: nickname } })
    );
    component.find("textarea").simulate("change", { target: { value: message } });
    component.find("button[type='submit']").simulate("click");
    expect(handler).toHaveBeenCalledWith({
      nickname: nickname,
      message: message
    });
  });
});
