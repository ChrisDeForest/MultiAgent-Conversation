import React, { useState, useEffect, useRef } from 'react';
import './App.css';

// Define types for messages
type Message = {
  sender: string;
  text: string;
  isTyping?: boolean;
};

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const [activeChatbot, setActiveChatbot] = useState<'Llama' | 'Deepseek'>('Deepseek');
  const [isConversationActive, setIsConversationActive] = useState<boolean>(false);
  const isConversationActiveRef = useRef(isConversationActive); // Ref to track the state
  const chatWindowRef = useRef<HTMLDivElement>(null);

  // Sync the ref with the state
  useEffect(() => {
    isConversationActiveRef.current = isConversationActive;
  }, [isConversationActive]);

  // to allow scrolling of the chat window automatically
  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  // to let the user submit text by pressing "Enter" or "Return"
  const enterPressed = (key: React.KeyboardEvent<HTMLInputElement>) => {
    if (key.key === 'Enter' && !isConversationActive){
      startConversation();
    }
  }

  // Function to send a message to the backend
  const sendMessage = async (message: string, chatbot: 'Llama' | 'Deepseek') => {
    const response = await fetch('http://127.0.0.1:5000/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, chatbot }),
    });

    const data = await response.json();
    const trimmedResponse = data.response.length > 500 ? data.response.substring(0, 500) + "..." : data.response;
    return trimmedResponse;
  };

  // Function to handle the conversation flow
  const handleConversation = async (initialInput?: string) => {
    let currentInput = initialInput ?? input;
    let currentChatbot = activeChatbot;

    while (isConversationActiveRef.current) { // Using the ref value
      const response = await sendMessage(currentInput, currentChatbot);
      
      if (!isConversationActiveRef.current) break;

      setMessages((prev) => [...prev, { sender: currentChatbot, text: response }]);

      currentChatbot = currentChatbot === 'Deepseek' ? 'Llama' : 'Deepseek';
      setActiveChatbot(currentChatbot);

      currentInput = response;
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  };

  // Start the conversation
  const startConversation = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { sender: 'User', text: input}]);
    setIsConversationActive(true);
  };

  // Stop the conversation
  const stopConversation = () => {
    setIsConversationActive(false);
    setMessages((prev) => [...prev, { sender: 'System', text: 'Conversation stopped.', isTyping: false}]);
  };

  // Effect to handle the conversation flow
  useEffect(() => {
    if (isConversationActive) {
      handleConversation(input);
    }
  }, [isConversationActive]);

  // Return the html for this component
  return (
    <div className="chat-container">
      <div className="chat-window" ref={chatWindowRef}>
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender.toLowerCase()}`}>
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <div className="input-area">
        <input type="text" onKeyDown={enterPressed} value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message..."/>
        <button onClick={startConversation} disabled={isConversationActive}>
          Start
        </button>
        <button onClick={stopConversation} disabled={!isConversationActive}>
          Stop
        </button>
      </div>
    </div>
  );
}

export default App;