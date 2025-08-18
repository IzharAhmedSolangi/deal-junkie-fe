import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { getAccessToken } from "../../storage/storage";
import ReconnectingWebSocket from "reconnecting-websocket";
import GlobalContext from "../../context/GlobalContext";

const SOCKETS_URL = import.meta.env.VITE_SOCKETS_URL;

function useMessagesSocket() {
  const token = getAccessToken();
  const { userInfo, setUnreadMessages } = useContext(GlobalContext);
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newMessage, setNewMessage] = useState("");
  const [selectedUser, setSelectedUser] = useState({
    chat_with: null,
    username: null,
    userId: null,
  });

  // WebSocket connection
  const socketRef = useRef(null);
  const socketUrl = useMemo(
    () =>
      `${SOCKETS_URL}/ws/chat/?partner_id=${selectedUser?.chat_with}&token=${token}`,
    [selectedUser?.chat_with, token]
  );

  // Scrolls chat to bottom
  const scrollToBottom = useCallback(() => {
    const chatContainer = document.getElementById("chat-container");
    if (chatContainer) {
      chatContainer.scrollTo({
        top: chatContainer.scrollHeight,
      });
    }
  }, []);

  // Connect to WebSocket
  const connectSocket = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.close();
    }

    socketRef.current = new ReconnectingWebSocket(socketUrl);

    socketRef.current.onopen = () => {
      setLoading(false);
    };

    socketRef.current.onmessage = (event) => {
      try {
        const response = JSON.parse(event.data);
        setLoading(false);

        if (response.message) {
          setMessages((prev) => [
            ...prev,
            {
              id: Date.now(),
              message: response.message,
              sender_id: response.sender_id,
              receiver_id: response.receiver_id,
              timestamp: new Date()
                .toISOString()
                .replace("T", " ")
                .slice(0, 19),
            },
          ]);
          setTimeout(scrollToBottom, 100);
        }

        if (response.users_chat_list) {
          setUsers(response.users_chat_list);

          const currentUserId = userInfo?.user?.id;
          const unreadCounts = response.users_chat_list.map((chat) => {
            const unreadCount = chat.messages.filter(
              (message) =>
                !message.is_read && message.receiver_id === currentUserId
            ).length;

            return {
              username: chat.username,
              chat_with: chat.chat_with,
              unreadCount,
            };
          });

          // 👉 total unread across all chats
          const totalUnread = unreadCounts.reduce(
            (sum, chat) => sum + chat.unreadCount,
            0
          );

          setUnreadMessages(totalUnread);

          if (selectedUser.userId) {
            const user = response.users_chat_list.find(
              (item) => item.chat_with === selectedUser.chat_with
            );
            if (user) {
              setMessages(user.messages);
              setTimeout(scrollToBottom, 100);
            }
          }
        }
      } catch (error) {
        setLoading(false);
      }
    };

    socketRef.current.onerror = (error) => {
      setLoading(false);
    };

    socketRef.current.onclose = () => {
      setLoading(false);
    };
  }, [
    socketUrl,
    selectedUser.userId,
    selectedUser.chat_with,
    scrollToBottom,
    userInfo,
  ]);

  useEffect(() => {
    if (userInfo) {
      connectSocket();
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [connectSocket]);

  // Send message through WebSocket
  const sendToSocket = useCallback(
    (message) => {
      if (
        socketRef.current &&
        socketRef.current.readyState === WebSocket.OPEN
      ) {
        const payload = JSON.stringify({
          message: message,
          receiver_id: selectedUser?.chat_with,
        });
        socketRef.current.send(payload);
        setTimeout(scrollToBottom, 100);
      } else {
        connectSocket();
      }
    },
    [selectedUser?.chat_with, connectSocket, scrollToBottom]
  );

  return {
    sendToSocket,
    connectSocket,
    users,
    setUsers,
    messages,
    setMessages,
    newMessage,
    setNewMessage,
    selectedUser,
    setSelectedUser,
    loading,
    setLoading,
    scrollToBottom,
  };
}

export default useMessagesSocket;
