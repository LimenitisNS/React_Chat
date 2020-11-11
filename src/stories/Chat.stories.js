import React from "react";
import Chat from "../components/Chat/Chat";
import { action } from "@storybook/addon-actions";

export default {
  title: "Chat",
  component: Chat,
  argTypes: {
    backgroundColor: { control: "color" }
  }
};

const Template = (args) => <Chat {...args} />;

export const Common = Template.bind({});
Common.args = {
  id: "123",
  title: "Chat №1",
  clickHandle: action("Chat clicked")
};
