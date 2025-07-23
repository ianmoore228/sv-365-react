import "../chat.css";
import agentImg from "../../../assets/images/agent.png";
import buyerImg from "../../../assets/images/user.png";
import { useState, useEffect, useRef } from "react";
import io from "socket.io-client";

const UserChat = () => {
  const messagesEndRef = useRef(null);
  const [userId, setUserId] = useState("");
  const [messages, setMessages] = useState([]);
  const [supportUsers, setSupportUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [selectedAgent, setSelectedAgent] = useState(null);

  const token = localStorage.getItem("token");

  const role = localStorage.getItem("urole");

  useEffect(() => {

    console.log("hi")

    async function getUserProfile() {
      if (!token) {
        console.error("No token found");
        return;
      }
      try {
        const response = await fetch("http://localhost:3000/me", {
          method: "POST",
          headers: {
            Authorization:` Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Error fetching user profile");
        }

        const user = await response.json();
        setUserId(user._id || "Guest");
      } catch (error) {
        console.error(error);
      }
    }

    async function getAllSupport() {
      if (!token) {
        console.error("No token found");
        return;
      }
      try {
        if (role === "buyer") {
        const response = await fetch("http://localhost:3000/find-support", {
          method: "POST",
          headers: {
            Authorization:` Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Error fetching support users");
        }

        const support = await response.json();
        setSupportUsers(support);
        console.log(support);

      } else if (role === "support") {
        const response = await fetch("http://localhost:3000/find-buyers", {
          method: "POST",
          headers: {
            Authorization:` Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Error fetching support users");
        }

        const support = await response.json();
        setSupportUsers(support);
        console.log(support);
      }

      
      } catch (error) {
        console.error(error);
      }
    }

    getUserProfile();
    getAllSupport();
  }, [token]);

  const fetchChatHistory = (agentId) => {
    const socket = io("http://localhost:3000");
    setMessages([]);

    if (!userId || !agentId) return;
    socket.emit("get-message-history", {
      fromUserId: userId,
      toUserId: agentId,
    });

    socket.on("chat-history", (history) => {
      setMessages(history);
      console.log("Получена история чата", history);
      console.log(agentId);
    });
  };

  useEffect(() => {
    const socket = io("http://localhost:3000");

    console.log("hej")

    socket.on("new-message", (newMessage) => {
      console.log("Получено новое сообщение:", newMessage);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    socket.on("chat-history", (history) => {
      setMessages(history);
      console.log("Получена история чата:", history);
    });

    return () => {
      socket.off("new-message");
      socket.off("chat-history");
      socket.disconnect();
      console.log("Сокет отключен");
    };
  }, [messages]);

  useEffect(() => {
    console.log("Обновлены сообщения:", messages);
  }, [messages]);

  const sendMessage = (e) => {
    const socket = io("http://localhost:3000");
    e.preventDefault();

    console.log("message:", message)

    if (message.trim() === "" || !selectedAgent) return;

    const messageData = {
      fromUserId: userId,
      toUserId: selectedAgent._id,
      content: message,
    };

    // Отправляем сообщение на сервер
    socket.emit("send-message", messageData);

    // Очищаем поле ввода
    setMessage("");

    // socket.once("new-message", (newMessage) => {
    //   console.log("Получено новое сообщение:", newMessage);
    //   setMessages((prevMessages) => [...prevMessages, newMessage]);
    // });

  };

  const handleMessageChange = (e) => {
    // socket.disconnect();
    let message = e.target.value;
    setMessage(message);
  };

  const handleAgentClick = (agent) => {
    setSelectedAgent(agent);
    fetchChatHistory(agent._id);
  };

  useEffect(() => {
    const container = messagesEndRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages]);

  return (
      <div className="user-chat">
        <div className="user-chat__wrapper">
          <div className="user-chat__container user-chat__container_left">
            <div className="user-chat__users">
              {supportUsers.map((user, index) => (
                <div
                  key={index}
                  onClick={() => handleAgentClick(user)}
                  className="user-chat__user"
                >
                  <img
                    className="user-chat__user-img"
                    src={role === "buyer" ? agentImg : buyerImg}
                    alt="Agent"
                  />
                  <div className="user-chat__message-wrapper">
                    <p>{user.name}</p>
                    <p>Lorem ipsum dolor sit amet</p>
                  </div>
                  <p>1</p>
                </div>
              ))}
            </div>
          </div>
          <div className="user-chat__container user-chat__container_right">
          <div className="user-chat__message-user">
            <img 
              className="user-chat__user-img"
              src={role === "buyer" ? agentImg : buyerImg}
              alt="User"
            />
                      <div className="user-chat__message-wrapper">
            <p>{selectedAgent ? selectedAgent.name : "Выберите пользователя"}</p>
            <p>{selectedAgent ? selectedAgent.phone : ""}</p>
            </div>
          </div>
            <div
              className="user-chat__message-content-container"
              ref={messagesEndRef}
            >
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`user-chat__message-content ${
                    msg.fromUserId === userId
                      ? "user-chat__message-content_from"
                      : "user-chat__message-content_to"
                  }`}
                >
                  <div
                    className={`user-chat__message ${
                      msg.fromUserId === userId
                        ? "user-chat__message_from"
                        : "user-chat__message_to"
                    }`}
                  >
                    <p
                      className={`user-chat__message-text ${
                        msg.fromUserId === userId
                          ? "user-chat__message-text_from"
                          : "user-chat__message-text_to"
                      }`}
                    >
                      {msg.content}
                    </p>
                  </div>
                  <p className="user-chat__timestamp">{msg.timestamp}</p>
                </div>
              ))}
            </div>
    
            <div className="user-chat__message-input-wrapper">
              <form
                className="user-chat__message-input-form"
                onSubmit={sendMessage}
              >
                <textarea
                  className="user-chat__message-input"
                  value={message}
                  onChange={handleMessageChange}
                ></textarea>
                <button type="submit" className="user-chat__message-button">
                  ⯈
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
};

export default UserChat;