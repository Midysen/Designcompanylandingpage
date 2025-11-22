import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Send, X, Loader2 } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface CostCalculatorChatProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CostCalculatorChat({ isOpen, onClose }: CostCalculatorChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hello! I can help you estimate the cost of your accent wall or ceiling project. To get started, please tell me:\n\n1. What type of project? (Accent wall or ceiling)\n2. Approximate square footage\n3. Room type (living room, bedroom, etc.)\n4. Any specific design preferences?',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Replace with your actual OpenAI API endpoint
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer YOUR_OPENAI_API_KEY`, // Replace with your API key
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content: 'You are a helpful assistant for ARTEL, a premium accent wall and ceiling installation company in Denver, Colorado. Help customers estimate project costs based on their requirements. Average costs: Basic accent wall $15-25/sq ft, Premium wall $30-50/sq ft, Basic ceiling $20-30/sq ft, Premium ceiling $40-60/sq ft. Ask relevant questions and provide detailed estimates.',
            },
            ...messages,
            userMessage,
          ],
        }),
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.choices[0].message.content,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      // Mock response for demonstration
      const mockResponse: Message = {
        role: 'assistant',
        content: 'Thank you for your interest! Based on typical projects:\n\n• Basic accent wall: $15-25 per sq ft\n• Premium accent wall: $30-50 per sq ft\n• Basic ceiling: $20-30 per sq ft\n• Premium ceiling: $40-60 per sq ft\n\nFor a precise quote, please contact us at +1 (720) 555-ARTEL or fill out the consultation form. Our team will provide a detailed estimate based on your specific requirements.',
      };
      setMessages((prev) => [...prev, mockResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl h-[600px] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#8A9A7B]/20">
          <div>
            <h3 className="text-[#3D4436]">Cost Calculator</h3>
            <p className="text-[#6B7562]">Get an instant estimate for your project</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center hover:bg-[#EDE8E3] rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-[#3D4436]" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-4 ${
                  message.role === 'user'
                    ? 'bg-gradient-to-r from-[#8A9A7B] to-[#A8B69B] text-white'
                    : 'bg-[#EDE8E3] text-[#3D4436]'
                }`}
              >
                <p className="whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-lg p-4">
                <Loader2 className="w-5 h-5 animate-spin" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              disabled={isLoading}
              className="flex-1"
            />
            <Button onClick={handleSend} disabled={isLoading || !input.trim()}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}