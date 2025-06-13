import React from 'react';

const Message = ({ content, sender }) => {
  return (
    <div className={`message ${sender}`}>
      <span className="sender">{sender}:</span>
      <span className="content">{content}</span>
    </div>
  );
};

export default Message;