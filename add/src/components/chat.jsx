import React, { useState, useRef, useEffect } from 'react';
import './styling/chat.css';

const GamerChatbot = () => {
  const [messages, setMessages] = useState([
    { text: "Greetings, gamer! I'm PixelBot - Your Ultimate Gaming Assistant. What's your play today?", sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  // Sample pairs of input-output for the gaming chatbot
  const pairs = [
    [/(hi|hello|hey|yo|sup|greetings)/i,
    ["Hey there, player! Ready to level up your gaming knowledge?",
    "Hello, gamer! What's your game of choice these days?"]],
    
    [/(how are you|how's it going)/i,
    ["I'm running at 144 FPS and ready to assist with all your gaming needs!",
    "Currently buffering with 0% latency - meaning I'm great! How about you?"]],
    
    [/(.*game|play|playing|title.*)/i,
    ["The hottest games right now are:\n" +
    "- Elden Ring: Shadow of the Erdtree\n" +
    "- Call of Duty: Modern Warfare III\n" +
    "- Baldur's Gate 3\n" +
    "- Helldivers 2\n" +
    "What genre are you into? FPS, RPG, or maybe strategy?",
    "I've got the scoop on all major titles across PC, PlayStation, Xbox and Switch. What platform do you game on?"]],
    
    [/(.*recommend|suggest|what should i play)/i,
    ["Based on current trends, I'd recommend:\n" +
    "For FPS fans: XDefiant or Valorant\n" +
    "For RPG lovers: Dragon's Dogma 2\n" +
    "For casual play: Fall Guys or Among Us\n" +
    "What's your preferred play style?",
    "Try these hidden gems:\n" +
    "- Hades II (roguelike)\n" +
    "- Palworld (survival)\n" +
    "- Stellar Blade (action)\n" +
    "Need something specific?"]],
    
    [/(.*spec|requirements|pc setup|rig)/i,
    ["Here's what you need for modern gaming:\n" +
    "Minimum:\n" +
    "- GPU: GTX 1060 / RX 580\n" +
    "- CPU: i5-8400 / Ryzen 5 2600\n" +
    "- RAM: 16GB\n" +
    "Recommended:\n" +
    "- GPU: RTX 3060 Ti / RX 6700 XT\n" +
    "- CPU: i5-12600K / Ryzen 7 5800X\n" +
    "- RAM: 32GB\n" +
    "Building or upgrading?"]],
    
    [/(.*deal|sale|discount|free)/i,
    ["Current gaming deals:\n" +
    "🔥 Steam Summer Sale starts June 27\n" +
    "🎮 PlayStation Plus Extra 30% off\n" +
    "🛒 Xbox Game Pass 1 month for $1\n" +
    "💻 Epic Games Store free weekly games",
    "Check these limited-time offers:\n" +
    "- Humble Bundle: Capcom Bundle\n" +
    "- Fanatical: Build Your Own Bundle\n" +
    "- GOG: Retro Classics Sale"]],
    
    [/(.*esports|competitive|tournament)/i,
    ["Upcoming major esports events:\n" +
    "🎮 League of Legends Worlds 2024\n" +
    "🔫 CS2 PGL Major Copenhagen\n" +
    "🕹️ EVO 2024 (Fighting Games)\n" +
    "Want team stats or match schedules?"]],
    
    [/(.*stream|twitch|youtube|content creator)/i,
    ["Top gaming streamers to watch:\n" +
    "📺 Ninja (Fortnite)\n" +
    "📺 Shroud (FPS)\n" +
    "📺 Pokimane (Variety)\n" +
    "📺 xQc (Just Chatting)\n" +
    "Looking for specific game streamers?"]],
    
    [/(.*controller|mouse|keyboard|headset|gear)/i,
    ["Best gaming peripherals 2024:\n" +
    "🎮 Controllers: DualSense Edge | Xbox Elite Series 2\n" +
    "🖱️ Mice: Logitech G Pro X Superlight 2 | Razer DeathAdder V3\n" +
    "⌨️ Keyboards: SteelSeries Apex Pro | Corsair K70 RGB\n" +
    "Need recommendations for specific games?"]],
    
    [/(.*patch|update|balance|meta)/i,
    ["Latest game updates:\n" +
    "⚔️ Elden Ring: New weapons and spells\n" +
    "🛡️ League of Legends: Champion buffs/nerfs\n" +
    "🔫 Valorant: New agent and map changes\n" +
    "Which game's meta are you curious about?"]],
    
    [/(.*trophy|achievement|completion)/i,
    ["Hardest achievements to unlock:\n" +
    "🏆 Seriously 5.0 (Gears 5)\n" +
    "🏆 The Dark Soul (Dark Souls)\n" +
    "🏆 Zenith (Fortnite)\n" +
    "Stuck on a particular challenge?"]],
    
    [/(.*multiplayer|co-op|pvp)/i,
    ["Best multiplayer games right now:\n" +
    "👥 Helldivers 2 (4-player co-op)\n" +
    "⚔️ Tekken 8 (fighting)\n" +
    "🌌 Destiny 2: The Final Shape\n" +
    "Want competitive or casual recommendations?"]],
    
    [/(.*single player|story mode|campaign)/i,
    ["Amazing single-player experiences:\n" +
    "🎭 Final Fantasy VII Rebirth\n" +
    "🧙‍♂️ Hogwarts Legacy\n" +
    "👻 Alan Wake 2\n" +
    "Looking for a specific genre? Action, adventure, or horror maybe?"]],
    
    [/(.*indie|small studio|underrated)/i,
    ["Hidden indie gems you must play:\n" +
    "🌟 Hollow Knight: Silksong (when it releases)\n" +
    "🌟 Hades II (Early Access)\n" +
    "🌟 Stray Gods: The Roleplaying Musical\n" +
    "Want more obscure recommendations?"]],
    
    [/(.*help|support|issue|problem)/i,
    ["Common gaming fixes:\n" +
    "1. Update graphics drivers\n" +
    "2. Verify game files\n" +
    "3. Check system requirements\n" +
    "4. Disable background apps\n" +
    "What specific problem are you having?"]],
    
    [/(.*quit|exit|bye|goodbye)/i,
    ["GG! Come back anytime for more gaming news and tips.",
    "Game over... for now! Happy gaming!"]],
    
    [/.*/i,
    ["Sorry, didn't catch that. Ask me about:\n" +
    "🎮 Game recommendations\n" +
    "🖥️ PC specs and setups\n" +
    "📅 Upcoming releases\n" +
    "💲 Current deals and sales\n" +
    "🏆 Esports and tournaments"]]
  ];

  const findResponse = (input) => {
    if (input.toLowerCase() === 'quit') {
      return "GG! Until next time, gamer. Keep those headshots crisp!";
    }

    for (const [pattern, responses] of pairs) {
      if (pattern.test(input)) {
        const randomIndex = Math.floor(Math.random() * responses.length);
        return responses[randomIndex];
      }
    }
    
    return "Not sure I follow. Ask me about games, hardware, esports, or anything gaming related!";
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;

    // Add user message
    setMessages(prev => [...prev, { text: inputValue, sender: 'user' }]);
    
    // Get bot response
    const botResponse = findResponse(inputValue);
    
    // Add bot response after a short delay
    setTimeout(() => {
      setMessages(prev => [...prev, { text: botResponse, sender: 'bot' }]);
    }, 500);
    
    setInputValue('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="gamer-chatbot-container">
      <div className="gamer-chatbot-header">
        <div className="gamer-chatbot-avatar">
          <img src="public/images/gaming-pictures-vdxx7dhes1jru5j0.webp" alt="PixelBot" />
        </div>
        <div className="gamer-chatbot-title">
          <h3>PixelBot Gaming Assistant</h3>
          <p className="gamer-status">Online</p>
        </div>
      </div>
      
      <div className="gamer-chatbot-messages">
        {messages.map((message, index) => (
          <div key={index} className={`gamer-message ${message.sender}`}>
            {message.sender === 'bot' && (
              <div className="gamer-bot-avatar">
                <img src="public/images/cool-gaming-joystick-soadws9y385y1tj8.webp" alt="Bot" />
              </div>
            )}
            <div className="gamer-message-content">
              {message.text.split('\n').map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="gamer-chatbot-input">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message here..."
        />
        <button onClick={handleSendMessage}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default GamerChatbot;