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
  list: [
    {
      id: "1",
      title: "Chat №1"
    },
    {
      id: "2",
      title: "Chat №2"
    },
    {
      id: "3",
      title: "Chat №3"
    }
  ],
  clickHandle: action("Chat clicked")
};

export const Empty = Template.bind({});
Empty.args = {
  list: [],
  clickHandle: action("Chat clicked")
};
