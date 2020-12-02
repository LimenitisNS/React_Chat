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

const chat = {
  id: "1",
  title: "Chat",
  userId: "1",
  participants: ["1", "2"]
};

export const Creator = Template.bind({});
Creator.args = {
  userId: "1",
  chat,
  goHandler: action("enter"),
  joinHandler: action("join"),
  deleteHandler: action("delete")
};

export const Participant = Template.bind({});
Participant.args = {
  userId: "2",
  chat,
  goHandler: action("enter"),
  joinHandler: action("join"),
  deleteHandler: action("delete")
};

export const Stranger = Template.bind({});
Stranger.args = {
  userId: "3",
  chat,
  goHandler: action("enter"),
  joinHandler: action("join"),
  deleteHandler: action("delete")
};
