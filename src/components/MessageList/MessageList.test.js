import { shallow } from "enzyme/build";
import MessagesList from "./MessagesList";
import React from "react";
import renderer from "react-test-renderer";

describe("MessagesList", () => {
  test("Add 3 new message", () => {
    const messages = [
      { user: "user1", message: "Message from user1" },
      { user: "user2", message: "Message from user2" },
      { user: "user3", message: "Message from user3" }
    ];
    const component = shallow(<MessagesList messages={messages} />);
    expect(component.find("Message")).toHaveLength(3);
  });

  test("add empty array", () => {
    const messages = [];
    const component = shallow(<MessagesList messages={messages} />);
    expect(component.find("Message")).toHaveLength(0);
  });

  test("Snaphot inline", () => {
    const messages = [
      { user: "user1", message: "Message from user1" },
      { user: "user2", message: "Message from user2" }
    ];
    const component = renderer.create(<MessagesList messages={messages} />).toJSON();
    expect(component).toMatchInlineSnapshot(`
      <div>
        <ul>
          <div>
            <li>
              <b>
                :
              </b>
            </li>
          </div>
          <div>
            <li>
              <b>
                :
              </b>
            </li>
          </div>
        </ul>
      </div>
    `);
  });
});
