import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ReconnectingWebSocket from "reconnecting-websocket";
import { getAccessToken } from "../../storage/storage";

function useNotificationsSocket() {
  const SOCKETS_URL = import.meta.env.VITE_SOCKETS_URL;
  const token = getAccessToken();

  const [notifications, setNotifications] = useState(null);
  const [unreadMessages, setUnreadMessages] = useState(null);
  const [unreadNotifications, setUnreadNotifications] = useState(null);
  // WebSocket connection
  const socketRef = useRef(null);
  const socketUrl = useMemo(
    () => `${SOCKETS_URL}/ws/notifications/?token=${token}`,
    [token]
  );

  // Connect to WebSocket
  const connectSocket = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.close();
    }

    socketRef.current = new ReconnectingWebSocket(socketUrl);

    socketRef.current.onopen = () => {};

    socketRef.current.onmessage = (event) => {
      try {
        const response = JSON.parse(event.data);
        setUnreadMessages(response.unread_messages_count);
        setUnreadNotifications(response.count);
        setNotifications(response.notifications);
      } catch (error) {}
    };

    socketRef.current.onerror = (error) => {};

    socketRef.current.onclose = () => {};
  }, [socketUrl]);

  useEffect(() => {
    if (!token) return;
    connectSocket();

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [connectSocket]);

  const sendToNotificationSocket = useCallback(
    (action, target) => {
      if (
        socketRef.current &&
        socketRef.current.readyState === WebSocket.OPEN
      ) {
        const payload = JSON.stringify({
          action: action,
          target: target,
        });
        socketRef.current.send(payload);
      } else {
        connectSocket();
      }
    },
    [connectSocket]
  );

  return {
    notifications,
    unreadMessages,
    unreadNotifications,
    sendToNotificationSocket,
  };
}

export default useNotificationsSocket;
