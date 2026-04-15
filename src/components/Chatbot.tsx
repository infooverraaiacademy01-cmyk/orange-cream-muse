import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Sparkles, Bot } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import ReactMarkdown from "react-markdown";

type Message = { role: "user" | "assistant"; content: string };

const TypingIndicator = () => (
  <div className="flex justify-start">
    <div className="bg-secondary rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-1.5">
      <span className="w-2 h-2 rounded-full bg-accent animate-bounce" style={{ animationDelay: "0ms" }} />
      <span className="w-2 h-2 rounded-full bg-accent animate-bounce" style={{ animationDelay: "150ms" }} />
      <span className="w-2 h-2 rounded-full bg-accent animate-bounce" style={{ animationDelay: "300ms" }} />
    </div>
  </div>
);

const ChatMessage = ({ msg }: { msg: Message }) => (
  <motion.div
    initial={{ opacity: 0, y: 8, scale: 0.96 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.25 }}
    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
  >
    {msg.role === "assistant" && (
      <div className="w-7 h-7 rounded-full bg-accent/15 flex items-center justify-center flex-shrink-0 mr-2 mt-1">
        <Bot className="w-4 h-4 text-accent" />
      </div>
    )}
    <div
      className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
        msg.role === "user"
          ? "bg-primary text-primary-foreground rounded-br-sm"
          : "bg-secondary text-foreground rounded-bl-sm"
      }`}
    >
      {msg.role === "assistant" ? (
        <div className="prose prose-sm max-w-none [&_p]:my-1 [&_ul]:my-1 [&_li]:my-0.5 [&_strong]:text-primary [&_a]:text-accent [&_a]:underline">
          <ReactMarkdown>{msg.content}</ReactMarkdown>
        </div>
      ) : (
        msg.content
      )}
    </div>
  </motion.div>
);

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [showPromo, setShowPromo] = useState(false);
  const [userName, setUserName] = useState("");
  const [nameSubmitted, setNameSubmitted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowPromo(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const submitName = () => {
    if (!userName.trim()) return;
    setNameSubmitted(true);
    setMessages([
      {
        role: "assistant",
        content: `Hi ${userName.trim()}! 👋 Welcome to B-Panacea Education. I'm here to help you find the perfect tutor for your child. How can I assist you today?\n\nYou can ask me about:\n- **Our tutoring services** (SEN, PE, Music, Academic, IELTS)\n- **How to get started**\n- **Pricing and scheduling**\n- **Anything else about B-Panacea!**`,
      },
    ]);
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg: Message = { role: "user", content: input.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("chat", {
        body: { messages: newMessages, userName: userName.trim() },
      });

      if (error) throw error;

      const reply = data?.choices?.[0]?.message?.content || data?.reply || "I'm sorry, I couldn't process that. Please try again.";
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I'm having trouble connecting right now. Please try again or email us at info@bpanacea.co.uk" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Promo bubble */}
      <AnimatePresence>
        {showPromo && !open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed bottom-24 right-4 sm:right-6 z-[55] bg-card rounded-2xl shadow-xl border border-accent/20 p-4 max-w-[260px]"
          >
            <button onClick={() => setShowPromo(false)} className="absolute top-2 right-2 text-muted-foreground hover:text-foreground">
              <X className="w-3 h-3" />
            </button>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-full bg-accent/15 flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-accent" />
              </div>
              <span className="text-xs font-bold text-accent">AI Assistant</span>
            </div>
            <p className="text-xs text-foreground font-semibold">Need help choosing the right tutor? 🎓</p>
            <p className="text-xs text-muted-foreground mt-1">Chat with our AI — instant personalised answers!</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat toggle button */}
      <motion.button
        onClick={() => { setOpen(!open); setShowPromo(false); }}
        className="fixed bottom-4 right-4 sm:right-6 z-[55] w-14 h-14 rounded-full bg-accent text-accent-foreground shadow-xl shadow-accent/30 flex items-center justify-center hover:brightness-110 transition-all hover:scale-110"
        whileTap={{ scale: 0.9 }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ repeat: Infinity, repeatDelay: 4, duration: 0.6 }}
        aria-label="Toggle chat"
      >
        {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="fixed bottom-20 right-4 sm:right-6 z-[55] w-[calc(100vw-2rem)] sm:w-[380px] h-[500px] bg-card rounded-2xl shadow-2xl border border-border flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center ring-2 ring-accent/30">
                <Bot className="w-5 h-5 text-accent" />
              </div>
              <div className="flex-1">
                <p className="font-display font-bold text-sm">B-Panacea Assistant</p>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <p className="text-xs text-primary-foreground/60">Online • AI-Powered</p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="w-8 h-8 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            {!nameSubmitted ? (
              /* Name input step */
              <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1, type: "spring" }}
                  className="w-20 h-20 rounded-full bg-gradient-to-br from-accent/20 to-primary/10 flex items-center justify-center mb-5"
                >
                  <Bot className="w-10 h-10 text-accent" />
                </motion.div>
                <h3 className="font-display text-lg font-bold text-primary mb-2">Welcome! 👋</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  I'm your personal B-Panacea assistant. What's your name?
                </p>
                <div className="w-full flex gap-2">
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && submitName()}
                    className="flex-1 px-4 py-2.5 rounded-full border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                    placeholder="Your name..."
                    autoFocus
                  />
                  <button
                    onClick={submitName}
                    disabled={!userName.trim()}
                    className="px-5 py-2.5 rounded-full bg-accent text-accent-foreground text-sm font-bold disabled:opacity-40 hover:brightness-110 transition-all shadow-md shadow-accent/20"
                  >
                    Start
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {messages.map((msg, i) => (
                    <ChatMessage key={i} msg={msg} />
                  ))}
                  {loading && <TypingIndicator />}
                  <div ref={messagesEndRef} />
                </div>

                {/* Quick suggestions */}
                {messages.length <= 1 && (
                  <div className="px-4 pb-2 flex flex-wrap gap-2">
                    {["Our services", "How to get started", "Pricing info"].map((q) => (
                      <button
                        key={q}
                        onClick={() => { setInput(q); }}
                        className="px-3 py-1.5 rounded-full border border-accent/30 text-xs font-semibold text-accent hover:bg-accent/10 transition-all"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                )}

                {/* Input */}
                <div className="p-3 border-t border-border bg-background">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
                      className="flex-1 px-4 py-2.5 rounded-full border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                      placeholder={`Ask me anything, ${userName}...`}
                      disabled={loading}
                    />
                    <button
                      onClick={sendMessage}
                      disabled={loading || !input.trim()}
                      className="w-10 h-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center disabled:opacity-40 hover:brightness-110 transition-all shadow-md shadow-accent/20"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
