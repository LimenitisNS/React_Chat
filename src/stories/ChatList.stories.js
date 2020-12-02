import React from "react";
import ChatList from "../components/ChatList/ChatList";
import { action } from "@storybook/addon-actions";

export default {
  title: "ChatList",
  component: ChatList
};

const Template = (args) => <ChatList {...args} />;

export const Common = Template.bind({});
Common.args = {
  userId: "1",
  list: [
    {
      id: "1",
      title: "Chat №1",
      userId: "1",
      participants: ["1", "2"]
    },
    {
      id: "2",
      title: "Chat №2",
      userId: "1",
      participants: ["1", "2"]
    },
    {
      id: "3",
      title: "Chat №3",
      userId: "2",
      participants: ["2", "3"]
    }
  ],
  goHandler: action("enter"),
  joinHandler: action("join"),
  deleteHandler: action("delete")
};
