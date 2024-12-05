import { useState, useRef, useEffect, useCallback } from 'react';
import { Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { FiMessageSquare, FiSend, FiX, FiSmile, FiMaximize2, FiMinimize2, FiChevronDown } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { menuItems } from '../../data/menuItems';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { GoogleGenerativeAI } from '@google/generative-ai';

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

  const formatResponse = (text: string) => {
    // Format headers
    text = text.replace(/# (.*)/g, '## 🎯 $1 ##\n');
    text = text.replace(/## (.*) ##/g, '\n\n**$1**\n');

    // Format sections
    text = text.replace(/Section: (.*)/g, '\n\n### 📍 $1 ###\n');
    
    // Format lists with emojis
    text = text.replace(/- (Benefits|Advantages|Pros):/g, '\n\n✨ **$1:**');
    text = text.replace(/- (Features|Highlights):/g, '\n\n🌟 **$1:**');
    text = text.replace(/- (Price|Cost|Investment):/g, '\n\n💰 **$1:**');
    text = text.replace(/- (Nutrition|Health):/g, '\n\n🥗 **$1:**');
    text = text.replace(/- (Note|Important):/g, '\n\n⚠️ **$1:**');
    
    // Format bullet points with different emojis
    const bulletPoints = [
      { regex: /• (.*sustainability.*)/gi, emoji: '🌱' },
      { regex: /• (.*healthy.*|.*nutrition.*)/gi, emoji: '🥗' },
      { regex: /• (.*investment.*|.*profit.*)/gi, emoji: '📈' },
      { regex: /• (.*technology.*|.*digital.*)/gi, emoji: '💻' },
      { regex: /• (.*menu.*|.*food.*)/gi, emoji: '🍽️' },
      { regex: /• (.*delivery.*|.*order.*)/gi, emoji: '🚚' },
      { regex: /• (.*price.*|.*cost.*)/gi, emoji: '💰' },
      { regex: /• (.*quality.*)/gi, emoji: '⭐' },
      { regex: /• (.*time.*|.*hours.*)/gi, emoji: '⏰' },
      { regex: /•/g, emoji: '▪️' } // Default bullet point
    ];

    bulletPoints.forEach(({ regex, emoji }) => {
      text = text.replace(regex, `${emoji}`);
    });

    // Format call-to-actions
    text = text.replace(/CTA: (.*)/g, '\n\n🎯 **$1**\n');

    // Format tips and recommendations
    text = text.replace(/Tip: (.*)/g, '\n\n💡 **Pro Tip:** $1\n');
    text = text.replace(/Recommendation: (.*)/g, '\n\n🌟 **Recommended:** $1\n');

    // Format prices and numbers
    text = text.replace(/€(\d+)/g, '**€$1**');
    text = text.replace(/(\d+)%/g, '**$1%**');

    // Format key metrics
    text = text.replace(/Metric: (.*): (.*)/g, '\n📊 **$1:** $2\n');

    // Format contact information
    text = text.replace(/Email: (.*)/g, '\n📧 $1\n');
    text = text.replace(/Phone: (.*)/g, '\n📞 $1\n');

    // Format dividers for sections
    text = text.replace(/---/g, '\n\n─────────────────────────\n\n');

    return text;
  };

  const sendMessage = async (messageContent: string) => {
    try {
      const apiKey = 'AIzaSyBC_gTcx1nbjeTTDUd80DxVuDek6ShPeV8';
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ 
        model: "gemini-pro",
        generationConfig: {
          temperature: 0.9,
          topP: 1,
          topK: 1,
          maxOutputTokens: 2048,
        },
      });

      setMessages(prevMessages => [
        ...prevMessages,
        { role: 'user', content: messageContent, timestamp: new Date() }
      ]);
      setInput('');
      setIsLoading(true);

      // Enhanced system prompt with detailed context
      const initialPrompt = `You are FreshBot, the friendly and knowledgeable AI assistant for FreshKing. Your responses should be well-structured and visually appealing. Follow these formatting guidelines:

1. Response Structure:
   • Always start with a warm greeting and acknowledgment of the query
   • Organize information into clear sections using "Section:" prefix
   • Use bullet points for lists (start with •)
   • End with a relevant call-to-action using "CTA:" prefix

2. Visual Elements:
   • Use appropriate section headers with "# Header #" format
   • Separate major sections with "---" dividers
   • Format prices with € symbol
   • Include "Tip:" for helpful suggestions
   • Use "Metric:" for key statistics

3. Content Guidelines:
   • Keep paragraphs short and focused
   • Use bullet points for features and benefits
   • Include relevant metrics and statistics
   • Add recommendations when appropriate
   • End with next steps or suggestions

Key Information:

# Company Overview #
Section: Mission & Vision
• Mission: Revolutionizing healthy eating through premium, accessible nutrition
• Vision: Becoming Europe's leading healthy food chain by 2026

Section: Core Values
• Health-first approach
• Sustainability commitment
• Innovation in food service
• Premium quality standards
• Customer-centric service

---

# Business Model #
Section: Market Opportunity
• €15 billion health food market in Germany
• Growing health consciousness trend
• Digital transformation in food service
• Expanding urban professional demographic

Section: Revenue Streams
• Dine-in service
• Takeout & delivery
• Corporate catering
• Meal prep subscriptions
• Health food retail

---

# Menu Offerings #
Section: Categories
• Fresh Salads & Bowls
• Power Protein Plates
• Healthy Wraps & Sandwiches
• Fresh-Pressed Juices
• Protein Smoothies
• Healthy Desserts

Section: Special Features
• Customizable portions
• Dietary options (Vegan, Keto, etc.)
• Nutritional transparency
• Seasonal ingredients
• Local sourcing

---

# Investment Opportunity #
Section: Current Round
• Series A funding
• €5 million target
• 25% projected annual ROI
• Clear exit strategy

Section: Growth Strategy
• 50 locations by 2025
• German market focus
• International expansion 2026
• Technology platform development
• Brand scaling

---

# Technology Platform #
Section: Features
• Mobile ordering system
• AI-powered inventory
• Smart analytics
• Customer loyalty program
• Digital kitchen management

---

# Sustainability #
Section: Initiatives
• 100% recyclable packaging
• Local ingredient sourcing
• Zero food waste program
• Carbon footprint tracking
• Community engagement

Current User Query: ${messageContent}

Remember to:
1. Structure your response clearly
2. Use appropriate formatting
3. Include relevant emojis
4. Add visual dividers between sections
5. End with a clear call-to-action
6. Keep the tone matching the query (professional for investors, friendly for customers)

Please provide a well-structured, visually appealing response:`;

      try {
        const result = await model.generateContent([
          { text: initialPrompt }
        ]);
        
        const response = await result.response;
        let responseText = response.text();

        // Apply formatting
        responseText = formatResponse(responseText);

        setMessages(prevMessages => [
          ...prevMessages,
          { role: 'assistant', content: responseText, timestamp: new Date() }
        ]);
      } catch (genError) {
        console.error('Generation error:', genError);
        throw genError;
      }

    } catch (error) {
      console.error('Error details:', error);
      let errorMessage = "I apologize, but I'm having trouble processing your request.";
      
      if (error instanceof Error) {
        console.log('Error message:', error.message);
        if (error.message.includes('API key')) {
          errorMessage = "API key configuration issue. Please check your environment setup.";
        } else {
          errorMessage = `Error: ${error.message}`;
        }
      }

      setMessages(prevMessages => [
        ...prevMessages,
        { 
          role: 'assistant', 
          content: errorMessage,
          timestamp: new Date() 
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    await sendMessage(input);
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
