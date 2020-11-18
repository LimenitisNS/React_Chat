import React from "react";
import Form from "../../components/Form/Form";
import MessagesList from "../../components/MessageList/MessagesList";
import APIService from "../../APIService";

export default class ChatView extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      users: []
    };

    this.timer = null;
  }

  componentDidMount() {
    this.setState({ users: [], messages: [] });
    this.timer = setInterval(this.getMessages.bind(this), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  postMessage({ content }) {
    APIService.message
      .create({ content, chatId: this.props.match.params.id })
      .then(() => this.getMessages());
  }

  getMessages() {
    APIService.message
      .getMessages(this.props.match.params.id)
      .then((response) => response.data)
      .then((messages) => this.setState({ messages }))
      .then(() => this.getUsers())
      .then(() => {
        const newMessages = this.state.message.map((message) => {
          const user = this.state.users.find((user) => user.id === message.userid);
          message.nickname = user.nickname;
          return message;
        });

        this.setState({ message: newMessages });
      });
  }

  getUsers() {
    const oldUsers = this.state.users;
    const oldUsersIds = oldUsers.map((user) => user.id);
    const newUsersIds = [...new Set(this.state.messages.map((message) => message.userid))];
    const toLoad = newUsersIds.filter((id) => !oldUsersIds.includes(id));

    if (!toLoad.length) return;

    return Promise.all(toLoad.map((id) => APIService.user.getById(id)))
      .then((response) => response.map((response) => response.data))
      .then((newUsers) => this.setState({ users: [...oldUsers, ...newUsers] }));
  }

  render() {
    const { messages } = this.state;

    return (
      <>
        <h1>Chat</h1>
        <Form postMessage={(data) => this.postMessage(data)} />
        <MessagesList messages={messages} />
      </>
    );
  }
}
