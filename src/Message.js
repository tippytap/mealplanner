import React from 'react';

class Message extends React.Component {

  componentDidMount() {
    console.log("message component did mount");
  }

  render() {
    return (
      <h2>{this.props.message}</h2>
    )
  }
}

export default Message;