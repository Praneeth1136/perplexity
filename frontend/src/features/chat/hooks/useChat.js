import { initializeSocketConnection } from "../services/chat.socket"
import { sendMessage, getChats, getMessages, deleteChat } from "../services/chat.api.js"
import { setChats, setCurrentChatId, setIsLoading, setError, addNewMessage, CreateNewChat,addMessages } from "../chat.Slice";
import { useDispatch } from "react-redux";
export const useChat = () => {

    const dispatch = useDispatch();

    async function handleSendMessage({ message, chatId }) {
        dispatch(setIsLoading(true));
        try {
            const data = await sendMessage(message, chatId);
            const { chat, aiMessage } = data;

            if (!chatId) {
                dispatch(CreateNewChat({ chatId: chat._id, title: chat.title }));
            }

            dispatch(addNewMessage({ chatId: chat._id, content: message, role: 'user' }));
            dispatch(addNewMessage({ chatId: chat._id, content: aiMessage.content, role: aiMessage.role }));
            dispatch(setCurrentChatId(chat._id));
        } catch (err) {
            dispatch(setError(err?.response?.data?.message || 'Failed to send message'));
        } finally {
            dispatch(setIsLoading(false));
        }
    }

    async function handleGetChats(){
        dispatch(setIsLoading(true));
        try {
            const data = await getChats();
            const {chats} = data;
            dispatch(setChats(chats.reduce((acc,chat)=>{
                acc[chat._id] = {
                    id:chat._id,
                    title:chat.title,
                    messages:[],
                    lastUpdated:chat.lastUpdated
                };
                return acc;
            },{})));
        } catch (err) {
            dispatch(setError(err?.response?.data?.message || 'Failed to fetch chats'));
        } finally {
            dispatch(setIsLoading(false));
        }
    }

    async function handleOpenChat(chatId){
        dispatch(setIsLoading(true));
        try {
            const data = await getMessages(chatId);
            const {messages} = data;

            const fromattedMessages = messages.map(msg=>({
                content:msg.content,
                role:msg.role,
            }))

            dispatch(addMessages({chatId,messages:fromattedMessages}));
            dispatch(setCurrentChatId(chatId));
        } catch (err) {
            dispatch(setError(err?.response?.data?.message || 'Failed to fetch messages'));
        }
        dispatch(setIsLoading(false));
    }

    return {
        initializeSocketConnection,
        handleSendMessage,
        handleGetChats,
        handleOpenChat
    }
}
