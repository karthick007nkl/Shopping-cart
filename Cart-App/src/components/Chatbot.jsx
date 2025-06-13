import React, { Component } from 'react';
import Message from './Message';
import '../styles/chatbot.css';

class Chatbot extends Component {
  state = {
    messages: [],
    input: ''
  };

  handleInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  handleSendMessage = () => {
    const { input, messages } = this.state;
    if (input.trim()) {
      this.setState({
        messages: [...messages, { content: input, sender: 'user' }],
        input: ''
      }, this.handleBotResponse);
    }
  };

  handleBotResponse = () => {
    const { messages } = this.state;
    const botMessage = "Hello! How can I assist you today?";
    this.setState({
      messages: [...messages, { content: botMessage, sender: 'bot' }]
    });
  };

  render() {
    const { messages, input } = this.state;

    return (
      <div className="chatbot card shadow" style={{ width: 370, borderRadius: 12, position: 'relative', background: '#f8f9fa', border: 'none' }}>
        <div className="card-header bg-primary text-white text-center" style={{ borderTopLeftRadius: 12, borderTopRightRadius: 12, fontWeight: 600, fontSize: 20 }}>
          Chatbot
        </div>
        <div className="card-body p-3" style={{ height: 340, overflowY: 'auto', background: '#fff' }}>
          <div className="messages mb-2">
            {messages.map((msg, index) => (
              <div key={index} className={`d-flex ${msg.sender === 'user' ? 'justify-content-end' : 'justify-content-start'}`}> 
                <span className={`badge ${msg.sender === 'user' ? 'bg-primary text-white' : 'bg-light text-dark'} mb-2`} style={{ fontSize: 15, padding: '10px 16px', borderRadius: 16, maxWidth: 220, wordBreak: 'break-word' }}>
                  {msg.content}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="card-footer bg-light p-2" style={{ borderBottomLeftRadius: 12, borderBottomRightRadius: 12 }}>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              value={input}
              onChange={this.handleInputChange}
              placeholder="Type a message..."
              style={{ borderRadius: 8 }}
              onKeyDown={e => { if (e.key === 'Enter') this.handleSendMessage(); }}
            />
            <button className="btn btn-primary ms-2" onClick={this.handleSendMessage} style={{ borderRadius: 8 }}>
              Send
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Chatbot;