import React from "react";
import APIService from "@/APIService";
import styles from "./styles.module.css";
import ChatForm from "@/components/ChatForm";
import ChatList from "@/components/ChatList";
import SearchChatForm from "@/components/SearchChatForm";

export default class ProfileView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      chats: [],
      foundChats: []
    };
  }

  componentDidMount() {
    APIService.user
      .getCurrent()
      .then((response) => response.data)
      .then((user) => this.setState({ user }))
      .then(() => APIService.chat.getMyChats(this.state.user.id))
      .then((response) => response.data)
      .then((chats) => this.setState({ chats }));
  }

  handleCreateChat({ title }) {
    APIService.chat.create({ title }).then(() => this.getChatList());
  }

  getChatList() {
    APIService.chat
      .getMyChats(this.state.user.id)
      .then((response) => response.data)
      .then((chats) => this.setState({ chats }));
  }

  goHandler(id) {
    this.props.history.push(`/chat/${id}`);
  }

  joinHandler(id) {
    if (!confirm("Do you want to join the chat ?")) return;
    APIService.chat.join(id).then(() => this.getChatList());
  }

  deleteHandler(id) {
    if (!confirm("Do you want to delete the chat ?")) return;
    APIService.chat.delete(id).then(() => this.getChatList());
  }

  handleChatSearch({ title }) {
    APIService.chat
      .search(title)
      .then((response) => response.data)
      .then((foundChats) => this.setState({ foundChats }));
  }

  render() {
    return (
      <>
        <h1>Profile user</h1>
        <div className={styles.profile_info}>
          {this.state.user && (
            <>
              <div>Nickname: {this.state.user.nickname}</div>
              <div>Create: {new Date(this.state.user.createdAt).toLocaleString()}</div>
            </>
          )}
        </div>
        <h3>Chats</h3>
        <ChatList
          userId={this.state.user?.id}
          list={this.state.chats}
          goHandler={(id) => this.goHandler(id)}
          joinHandler={(id) => this.joinHandler(id)}
          deleteHandler={(id) => this.deleteHandler(id)}
        />
        <ChatForm handleSubmit={(data) => this.handleCreateChat(data)} />

        <SearchChatForm handleSubmit={(data) => this.handleChatSearch(data)} />
        <ChatList
          userId={this.state.user?.id}
          list={this.state.foundChats}
          goHandler={(id) => this.goHandler(id)}
          joinHandler={(id) => this.joinHandler(id)}
          deleteHandler={(id) => this.deleteHandler(id)}
        />
      </>
    );
  }
}
