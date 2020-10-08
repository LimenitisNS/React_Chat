class MessagesList extends React.Component {
    render(){
        const {messages} = this.props;
        return <div id="messages">
            <ul>
                {messages.map((message, index) => (
                    <Message nick={message.nick} message={message.message} key={index}/>
                ))}
            </ul>
        </div>;
    }
}

//export default MessagesList;