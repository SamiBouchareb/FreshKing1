import { useState, useRef, useEffect, useCallback } from 'react';
import { Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { FiMessageSquare, FiSend, FiX, FiSmile, FiMaximize2, FiMinimize2, FiChevronDown } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { menuItems } from '../../data/menuItems';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { CHATBOT_API_KEY } from '../../config';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

interface MessageProps {
  message: Message;
  isLastMessage?: boolean;
}

const InvestorLoveButton = () => {
  return (
    <button 
      onClick={() => window.location.href = 'mailto:invest@freshking.com'}
      className="investor-love-button group transform hover:scale-110 transition-all duration-300"
    >
      <span className="flex items-center justify-center text-lg font-semibold">
        Love for Fresenius Investor 
        <svg 
          className="w-6 h-6 ml-2 text-red-500 group-hover:text-red-600 animate-heartbeat" 
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          <path 
            fillRule="evenodd" 
            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" 
            clipRule="evenodd" 
          />
        </svg>
      </span>
    </button>
  );
};

const MessageComponent: React.FC<MessageProps> = ({ message, isLastMessage }) => {
  const [displayedContent, setDisplayedContent] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showInvestButton, setShowInvestButton] = useState(false);
  const typingSpeedRef = useRef(30);
  const contentRef = useRef(message.content);
  const currentIndexRef = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const investmentKeywords = [
    "invest",
    "funding",
    "growth metrics",
    "valuation",
    "equity",
    "series a",
    "seed",
    "strategic",
    "investor",
    "fresenius"
  ];

  const checkForInvestmentContent = (content: string) => {
    const contentLower = content.toLowerCase();
    return investmentKeywords.some(keyword => contentLower.includes(keyword));
  };

  const typeNextCharacter = useCallback(() => {
    if (currentIndexRef.current < contentRef.current.length) {
      const currentChar = contentRef.current[currentIndexRef.current];
      setDisplayedContent(prev => prev + currentChar);
      
      currentIndexRef.current++;
      
      // Calculate delay for next character
      let delay = typingSpeedRef.current;
      if (".!?".includes(currentChar)) {
        delay = typingSpeedRef.current * 8; // Longer pause at punctuation
      } else if (",;:".includes(currentChar)) {
        delay = typingSpeedRef.current * 4; // Medium pause at other punctuation
      } else if (" ".includes(currentChar)) {
        delay = typingSpeedRef.current * 1.5; // Slight pause at spaces
      }

      // Schedule next character
      timeoutRef.current = setTimeout(typeNextCharacter, delay);
    } else {
      setIsTyping(false);
      setShowInvestButton(checkForInvestmentContent(contentRef.current));
    }
  }, []);

  useEffect(() => {
    // Reset state when message changes
    contentRef.current = message.content;
    currentIndexRef.current = 0;
    
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (message.role === "assistant" && isLastMessage) {
      setIsTyping(true);
      setShowInvestButton(false);
      setDisplayedContent("");
      
      // Start typing after a brief delay
      timeoutRef.current = setTimeout(() => {
        typeNextCharacter();
      }, 500);
    } else {
      setDisplayedContent(message.content);
      setIsTyping(false);
      if (message.role === "assistant") {
        setShowInvestButton(checkForInvestmentContent(message.content));
      }
    }

    // Cleanup
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [message, isLastMessage, typeNextCharacter]);

  const messageClasses = `
    flex 
    ${message.role === "user" ? "justify-end" : "justify-start"}
    mb-4
    ${isTyping ? "typing-message" : ""}
  `;

  const bubbleClasses = `
    max-w-[80%] 
    rounded-lg 
    p-4 
    ${message.role === "user"
      ? "bg-gradient-to-r from-green-500 to-green-600 text-white"
      : "bg-white border border-gray-100 shadow-sm"
    }
    ${isTyping ? "typing-bubble" : ""}
  `;

  return (
    <div className={messageClasses}>
      <div className={bubbleClasses}>
        {isTyping ? (
          <div className="whitespace-pre-wrap">{displayedContent}</div>
        ) : (
          <Markdown
            remarkPlugins={[remarkGfm]}
            components={{
              p: ({node, ...props}) => (
                <p className="mb-3 last:mb-0 leading-relaxed" {...props} />
              ),
              ul: ({node, ...props}) => (
                <ul className="mb-3 last:mb-0 space-y-2" {...props} />
              ),
              ol: ({node, ...props}) => (
                <ol className="mb-3 last:mb-0 space-y-2" {...props} />
              ),
              li: ({node, ...props}) => (
                <li className="ml-4" {...props} />
              ),
              h3: ({node, ...props}) => (
                <h3 className="font-bold text-lg mb-2" {...props} />
              ),
              table: ({node, ...props}) => (
                <div className="overflow-x-auto mb-3 last:mb-0">
                  <table className="min-w-full border-collapse" {...props} />
                </div>
              ),
              th: ({node, ...props}) => (
                <th className="border-b-2 border-gray-200 bg-gray-50 px-4 py-2 text-left" {...props} />
              ),
              td: ({node, ...props}) => (
                <td className="border-b border-gray-100 px-4 py-2" {...props} />
              ),
              blockquote: ({node, ...props}) => (
                <blockquote className="border-l-4 border-green-500 pl-4 italic my-3" {...props} />
              ),
              code: ({node, inline, ...props}) => (
                inline 
                  ? <code className="px-1.5 py-0.5 rounded bg-gray-100 text-green-600 text-sm" {...props} />
                  : <code className="block bg-gray-100 p-4 rounded-lg overflow-x-auto" {...props} />
              ),
            }}
          >
            {displayedContent}
          </Markdown>
        )}
        {isTyping && (
          <div className="typing-indicator mt-2">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        )}
        {showInvestButton && !isTyping && (
          <div className="mt-6 flex justify-center transform hover:scale-105 transition-all duration-300">
            <InvestorLoveButton />
          </div>
        )}
      </div>
    </div>
  );
};

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isScrolledToBottom) {
      scrollToBottom();
    }
  }, [messages, isScrolledToBottom]);

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const isBottom = Math.abs(scrollHeight - clientHeight - scrollTop) < 10;
      setIsScrolledToBottom(isBottom);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const systemMessage: Message = {
    role: "system",
    content: `You are FreshBot, the AI assistant for FreshKing, a premium healthy food restaurant chain. 
Please format your responses using Markdown for better readability:
- Use **bold** for emphasis
- Use bullet points for lists
- Use \`code\` for prices and menu items
- Use > for important notes
- Use ### for section headers
- Use tables when comparing items
- Use --- for separating sections

### Key Information

#### Menu Categories
- Bowls
- Sandwiches
- Soups
- Main Meals
- Salads
- Smoothies
- Snacks

#### Popular Items
| Item | Price | Dietary |
|------|--------|---------|
| Buddha Bowl | \`$12.99\` | Vegan & GF |
| Poke Bowl | \`$14.99\` | GF |
| Grilled Salmon | \`$18.99\` | GF |
| Mediterranean Salad | \`$11.99\` | GF |
| Green Goddess Smoothie | \`$7.99\` | Vegan & GF |

### Investor Information

#### Company Overview
- Founded: 2020
- Locations: 15+ restaurants across major cities
- Revenue Growth: 200% year-over-year
- Current Valuation: $50M
- Total Funding: Series A round open

#### Investment Highlights
1. **Market Leadership**
   - Leading healthy fast-casual chain
   - Innovative menu with focus on sustainability
   - Strong brand recognition

2. **Growth Metrics**
   - 200% YoY Revenue Growth
   - 80% Customer Retention Rate
   - 45% Gross Margin
   - 25% EBITDA Margin

3. **Expansion Plans**
   - 50+ new locations by 2025
   - International expansion starting 2024
   - Ghost kitchen partnerships
   - Franchise model development

4. **Technology Integration**
   - Advanced POS System
   - Mobile App with 100K+ downloads
   - AI-powered inventory management
   - Data-driven menu optimization

5. **Sustainability Initiatives**
   - 100% Renewable Energy by 2024
   - Zero-waste program in all locations
   - Local sourcing partnerships
   - Biodegradable packaging

#### Investment Opportunities
| Investment Tier | Minimum | Benefits |
|----------------|---------|-----------|
| Seed | \`$50,000\` | 2% equity + Advisory role |
| Series A | \`$250,000\` | 5% equity + Board seat |
| Strategic | \`$1,000,000\` | 15% equity + Executive board |

Your role is to:
1. Help customers with menu recommendations
2. Answer questions about ingredients and dietary restrictions
3. Assist with ordering
4. Provide nutritional information
5. Explain our rewards program
6. Share information about our sustainability practices
7. Provide detailed investor information
8. Help with investment inquiries

Always be friendly, professional, and knowledgeable. For investment inquiries, direct serious investors to our investor relations team at invest@freshking.com.`,
    timestamp: new Date()
  };

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([systemMessage]);
    }
  }, []);

  const handleAddToCart = (itemId: string) => {
    const item = menuItems.find(item => item.id === itemId);
    if (item) {
      addToCart(item);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `✨ **Added to Cart!**\n\nI've added \`${item.name}\` to your cart. Would you like anything else?`,
        timestamp: new Date()
      }]);
    }
  };

  const formatAssistantMessage = (content: string) => {
    return content
      .replace(/\n-/g, '\n\n-')
      .replace(/(\d+\.)/g, '\n$1')
      .replace(/\n###/g, '\n\n###');
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setIsScrolledToBottom(true);

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${CHATBOT_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            systemMessage,
            ...messages.map(({ role, content }) => ({ role, content })),
            { role: userMessage.role, content: userMessage.content }
          ],
          temperature: 0.7,
          max_tokens: 500,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('OpenAI API Error:', errorData);
        
        if (response.status === 429) {
          throw new Error('> **Rate Limit Reached**\n\nPlease wait a moment before sending another message. Our AI is taking a short break! 🌟');
        }
        
        throw new Error(errorData.error?.message || 'Failed to get response from OpenAI');
      }

      const data = await response.json();
      
      if (!data.choices || !data.choices[0]) {
        throw new Error('Invalid response format from OpenAI');
      }

      const assistantMessage = data.choices[0].message.content;
      
      if (assistantMessage.includes("[NAVIGATE:")) {
        const route = assistantMessage.match(/\[NAVIGATE:(.*?)\]/)?.[1];
        if (route) {
          navigate(route);
        }
      }

      if (assistantMessage.includes("[ADD_TO_CART:")) {
        const itemId = assistantMessage.match(/\[ADD_TO_CART:(.*?)\]/)?.[1];
        if (itemId) {
          handleAddToCart(itemId);
        }
      }

      const finalMessage: Message = {
        role: 'assistant',
        content: formatAssistantMessage(assistantMessage.replace(/\[NAVIGATE:.*?\]|\[ADD_TO_CART:.*?\]/g, '')),
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, finalMessage]);
    } catch (error) {
      console.error('Error:', error);
      setMessages((prev) => [...prev, {
        role: 'assistant',
        content: error instanceof Error ? error.message : '> **Oops!** Something went wrong. Please try again in a moment.',
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const chatWindowClasses = isExpanded
    ? 'fixed inset-4 m-0'
    : 'absolute bottom-0 right-0 mb-4 w-[600px]';

  const messageContainerClasses = isExpanded
    ? 'h-[calc(100vh-180px)]'
    : 'h-[500px]';

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`group bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-2xl hover:scale-110 transition-all duration-300 flex items-center justify-center ${
          isOpen ? 'opacity-0 scale-90' : 'opacity-100 scale-100'
        }`}
        aria-label="Open chat"
      >
        <div className="relative">
          <FiMessageSquare className="w-7 h-7" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
        </div>
      </button>

      {/* Chat Window */}
      <Transition
        show={isOpen}
        as={Fragment}
        enter="transition ease-out duration-300"
        enterFrom="transform opacity-0 scale-95 translate-y-10"
        enterTo="transform opacity-100 scale-100 translate-y-0"
        leave="transition ease-in duration-200"
        leaveFrom="transform opacity-100 scale-100 translate-y-0"
        leaveTo="transform opacity-0 scale-95 translate-y-10"
      >
        <div className={`${chatWindowClasses} bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 transition-all duration-300 ease-in-out`}>
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-green-500 to-green-600 text-white">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <FiMessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-bold text-lg">Your FreshBot</h2>
                  <p className="text-xs text-green-100">Always here to help</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                  aria-label={isExpanded ? 'Minimize chat' : 'Maximize chat'}
                >
                  {isExpanded ? (
                    <FiMinimize2 className="w-5 h-5" />
                  ) : (
                    <FiMaximize2 className="w-5 h-5" />
                  )}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                  aria-label="Close chat"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div 
            ref={messagesContainerRef}
            className={`${messageContainerClasses} overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-gray-50 to-white scroll-smooth`}
          >
            {messages.length === 1 && (
              <div className="text-center py-8">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiSmile className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-800 text-xl mb-2">Welcome to FreshBot!</h3>
                <p className="text-gray-500">How can I assist you today? Ask me about our menu, dietary options, or sustainability practices!</p>
              </div>
            )}
            {messages.slice(1).map((message, index) => (
              <MessageComponent key={index} message={message} isLastMessage={index === messages.length - 1} />
            ))}
            {isLoading && (
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <FiMessageSquare className="w-4 h-4 text-green-600" />
                </div>
                <div className="bg-white border border-gray-100 p-4 rounded-2xl shadow-sm">
                  <div className="flex space-x-2">
                    <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-bounce" />
                    <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                  </div>
                </div>
              </div>
            )}
            {!isScrolledToBottom && (
              <button
                onClick={() => {
                  setIsScrolledToBottom(true);
                  scrollToBottom();
                }}
                className="fixed bottom-[120px] right-1/2 transform translate-x-1/2 bg-white shadow-lg rounded-full p-2 flex items-center space-x-2 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
              >
                <FiChevronDown className="w-4 h-4" />
                <span>New messages</span>
              </button>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-gray-100">
            <div className="flex space-x-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type your message..."
                  className="w-full p-4 pl-5 pr-14 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-gray-800 placeholder-gray-400"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-green-500 to-green-600 text-white p-2.5 rounded-lg hover:shadow-lg disabled:opacity-50 disabled:hover:shadow-none transition-all"
                >
                  <FiSend className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  );
}
