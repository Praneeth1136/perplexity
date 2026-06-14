import { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useChat } from '../hooks/useChat';
import { useDispatch } from 'react-redux';
import { setCurrentChatId } from '../chat.Slice';
import { initializeSocketConnection } from "../services/chat.socket"
import ReactMarkdown from 'react-markdown';

const Dashboard = () => {
  const user = useSelector((state) => state.auth.user);
  const currentChatId = useSelector((state) => state.chat.currentChatId);
  const currentChat = useSelector((state) => state.chat.chats[state.chat.currentChatId]);
  const isLoading = useSelector((state) => state.chat.isLoading);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [input, setInput] = useState('');
  const { handleSendMessage, initializeSocketConnection, handleGetChats, handleOpenChat } = useChat();
  const messagesEndRef = useRef(null);

  const chats = useSelector((state) => state.chat.chats);
  const chatList = Object.values(chats || {}).sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated));

  const messages = currentChat?.messages || [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(()=>{
    initializeSocketConnection();
    handleGetChats();
  },[])

  const openChat = (chatId)=>{
    handleOpenChat(chatId);
  }

  const handleNewChat = () => {
    dispatch(setCurrentChatId(null));
    setInput('');
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;
    setInput('');
    await handleSendMessage({ message: trimmed, chatId: currentChatId });
  };

  return (
    <main className="h-screen w-full flex bg-neutral-950 text-neutral-200 font-[Inter,sans-serif]">

      {/* ═══════════ SIDEBAR ═══════════ */}
      <aside
        className={`h-full flex flex-col border-r border-neutral-800 bg-neutral-900 shrink-0 transition-all duration-200 ${
          sidebarOpen ? 'w-64' : 'w-0 overflow-hidden'
        }`}
      >
        {/* ── Logo + Collapse ── */}
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            {/* Logo icon */}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7l10 5 10-5-10-5z" fill="#20b8cd" opacity=".85" />
              <path d="M2 17l10 5 10-5" stroke="#20b8cd" strokeWidth="2" fill="none" />
              <path d="M2 12l10 5 10-5" stroke="#20b8cd" strokeWidth="2" fill="none" />
            </svg>
            <span className="text-sm font-semibold text-white tracking-tight">Perplexity</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-1 rounded-md text-neutral-500 hover:text-neutral-300 hover:bg-neutral-800 transition-colors"
          >
            {/* sidebar toggle */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="3" x2="9" y2="21"/></svg>
          </button>
        </div>

        {/* ── Nav Items ── */}
        <nav className="px-2 space-y-0.5 pb-3">
          {[
            { label: 'New', onClick: handleNewChat, icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>, accent: true },
            // { label: 'Computer', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg> },
            // { label: 'Spaces', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg> },
            // { label: 'Artefacts', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg> },
            // { label: 'Customise', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg> },
            { label: 'History', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> },
          ].map((item) => (
            <button
              key={item.label}
              onClick={item.onClick}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-medium transition-colors ${
                item.accent
                  ? 'text-cyan-400 hover:bg-cyan-400/10'
                  : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        {/* ── Divider ── */}
        <div className="mx-3 border-t border-neutral-800" />

        {/* ── Chat History ── */}
        {/* ── Chat History (populated dynamically) ── */}
        <div className="flex-1 overflow-y-auto px-2 py-2 space-y-0.5">
          {chatList.map((c) => (
            <div
              key={c.id}
              onClick={() => openChat(c.id)}
              className={`group flex items-center px-3 py-2 rounded-lg text-[13px] cursor-pointer transition-colors ${
                currentChatId === c.id
                  ? 'bg-neutral-800 text-neutral-200'
                  : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800'
              }`}
            >
              <span className="truncate flex-1">{c.title || 'New Chat'}</span>
            </div>
          ))}
        </div>



        {/* ── User Profile ── */}
        <div className="px-2 pb-3">
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer">
            <div className="w-7 h-7 rounded-full bg-cyan-600 flex items-center justify-center text-white text-xs font-semibold shrink-0">
              {user?.username?.charAt(0)?.toUpperCase() || 'P'}
            </div>
            <span className="text-[13px] font-medium text-neutral-200 truncate flex-1">
              {user?.username || 'Praneeth'}
            </span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-500 hover:text-neutral-300 shrink-0"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
          </div>
        </div>
      </aside>

      {/* ═══════════ MAIN CONTENT ═══════════ */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* ── Top Bar ── */}
        <header className="flex items-center justify-between px-6 h-12 shrink-0 border-b border-neutral-800">
          {/* Left: sidebar toggle (only when collapsed) */}
          <div className="flex items-center gap-2">
            {!sidebarOpen && (
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-1.5 rounded-md text-neutral-500 hover:text-neutral-300 hover:bg-neutral-800 transition-colors mr-2"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="3" x2="9" y2="21"/></svg>
              </button>
            )}
          </div>

          {/* Center: tabs */}
          <div className="flex items-center gap-1">
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] font-medium text-cyan-400 bg-cyan-400/10">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L9.5 9.5 2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5L12 2z"/></svg>
              Answer
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] font-medium text-neutral-500 hover:text-neutral-300 hover:bg-neutral-800 transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
              Links
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] font-medium text-neutral-500 hover:text-neutral-300 hover:bg-neutral-800 transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
              Images
            </button>
          </div>

          {/* Right: share */}
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px] font-medium text-neutral-400 hover:text-neutral-200 border border-neutral-700 hover:border-neutral-600 hover:bg-neutral-800 transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
              Share
            </button>
          </div>
        </header>

        {/* ── Messages Area ── */}
        <div className="flex-1 overflow-y-auto">
          {messages.length === 0 && !isLoading ? (
            <div className="flex-1 flex flex-col items-center justify-center h-full px-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-emerald-600 flex items-center justify-center mb-8 shadow-lg shadow-cyan-500/20">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M12 2L9.5 9.5 2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5L12 2z"/></svg>
              </div>
              <h1 className="text-[28px] font-medium text-white mb-3">
                Where knowledge begins
              </h1>
              <p className="text-neutral-400 text-[16px] text-center max-w-md">
                Ask anything and I'll find the best answers for you.
              </p>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto px-6 py-8">
              {messages.map((msg, idx) => (
                msg.role === 'user' ? (
                  /* User message bubble */
                  <div key={idx} className="flex justify-end mb-6">
                    <div className="px-4 py-2.5 rounded-2xl bg-neutral-800 text-neutral-100 text-[15px] max-w-[70%]">
                      {msg.content}
                    </div>
                  </div>
                ) : (
                  /* AI response */
                  <div key={idx} className="mb-6">
                    <div className="text-[15px] leading-7 text-neutral-200 whitespace-pre-wrap prose prose-invert max-w-none prose-p:leading-relaxed prose-pre:bg-neutral-900 prose-pre:border prose-pre:border-neutral-800">
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                  </div>
                )
              ))}
              {isLoading && (
                <div className="flex items-center gap-1.5 py-4">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse [animation-delay:0.2s]" />
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse [animation-delay:0.4s]" />
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* ── Input Bar ── */}
        <div className="shrink-0 px-6 pb-5 pt-2">
          <div className="max-w-3xl mx-auto">
            <form onSubmit={onSubmit} className="flex items-center bg-neutral-900 border border-neutral-700 rounded-2xl px-4 py-3 focus-within:border-cyan-700/50 transition-colors">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={messages.length > 0 ? 'Ask a follow-up...' : 'Ask anything...'}
                className="flex-1 bg-transparent text-[15px] text-neutral-200 placeholder-neutral-500 outline-none"
              />
              {/* Send button */}
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className={`ml-3 p-2 rounded-xl transition-colors ${
                  input.trim() && !isLoading
                    ? 'bg-cyan-600 text-white hover:bg-cyan-500'
                    : 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                }`}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>
              </button>
            </form>

            {/* Bottom row: Search + Model */}
            <div className="flex items-center mt-2 px-1">
              <div className="flex items-center gap-2">
                <button className="p-1.5 rounded-lg text-neutral-500 hover:text-neutral-300 hover:bg-neutral-800 transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                </button>
                <button className="flex items-center gap-1 px-2 py-1 rounded-lg text-[12px] text-neutral-500 hover:text-neutral-300 hover:bg-neutral-800 transition-colors">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                  Search
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"/></svg>
                </button>
              </div>

              <div className="flex-1" />

              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1 px-2 py-1 rounded-lg text-[12px] text-neutral-500 hover:text-neutral-300 hover:bg-neutral-800 transition-colors">
                  Model
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"/></svg>
                </button>
                <button className="p-1.5 rounded-lg text-neutral-500 hover:text-neutral-300 hover:bg-neutral-800 transition-colors" title="Voice input">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;