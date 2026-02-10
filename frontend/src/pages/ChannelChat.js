import React, { useState, useEffect, useContext, useRef, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import NavBar from "./navbar";
import api from "../utils/api";
import AuthContext from "../context/AuthContext";

export default function ChannelChat() {
    const { channelId } = useParams();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [channel, setChannel] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [imageLink, setImageLink] = useState("");
    const messagesEndRef = useRef(null);

    const fetchChannelDetails = useCallback(async () => {
        try {
            const { data } = await api.get("/channels");
            const currentChannel = data.find(c => c._id === channelId);
            setChannel(currentChannel);
        } catch (error) {
            console.error("Error fetching channel details:", error);
        }
    }, [channelId]);

    const fetchMessages = useCallback(async () => {
        try {
            const { data } = await api.get(`/messages/${channelId}`);
            setMessages(data);
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    }, [channelId]);

    useEffect(() => {
        fetchChannelDetails();
        fetchMessages();
        const interval = setInterval(fetchMessages, 3000); // Polling for messages every 3s
        return () => clearInterval(interval);
    }, [fetchChannelDetails, fetchMessages]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim() && !imageLink.trim()) return;

        try {
            const { data } = await api.post("/messages", {
                channelId,
                content: newMessage,
                image: imageLink
            });
            setMessages([...messages, data]);
            setNewMessage("");
            setImageLink("");
        } catch (error) {
            console.error("Error sending message:", error);
            alert("Failed to send message.");
        }
    };

    if (!user) {
        return (
            <div style={{ backgroundColor: "#030303", minHeight: "100vh", color: "#d7dadc", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <p>Please <Link to="/login" style={{ color: "#ff4500" }}>Login</Link> to join the chat.</p>
            </div>
        );
    }

    return (
        <div style={{ backgroundColor: "#030303", height: "100vh", color: "#d7dadc", display: "flex", flexDirection: "column" }}>
            <NavBar />

            <div style={{
                background: "#1a1a1b",
                padding: "15px 40px",
                borderBottom: "1px solid #343536",
                display: "flex",
                alignItems: "center",
                gap: "15px"
            }}>
                <button onClick={() => navigate("/community")} style={{ background: "transparent", border: "none", color: "#818384", cursor: "pointer", fontSize: "20px" }}>←</button>
                <div style={{ fontSize: "24px" }}>{channel?.icon || "🗨️"}</div>
                <div>
                    <h1 style={{ fontSize: "18px", margin: 0 }}>{channel?.name}</h1>
                    <p style={{ fontSize: "12px", color: "#818384", margin: 0 }}>{channel?.description}</p>
                </div>
            </div>

            <div style={{ flex: 1, overflowY: "auto", padding: "20px 40px" }}>
                {messages.map((msg, index) => (
                    <div key={index} style={{ marginBottom: "20px", display: "flex", gap: "12px" }}>
                        <img
                            src={msg.sender?.profilePic || "https://www.redditstatic.com/avatars/avatar_default_02_A5A4A4.png"}
                            alt="avatar"
                            style={{ width: "36px", height: "36px", borderRadius: "4px" }}
                        />
                        <div style={{ flex: 1 }}>
                            <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
                                <span style={{ fontWeight: "bold", fontSize: "14px", color: "white" }}>{msg.sender?.username}</span>
                                <span style={{ fontSize: "11px", color: "#818384" }}>{new Date(msg.createdAt).toLocaleTimeString()}</span>
                            </div>
                            {msg.content && <p style={{ fontSize: "14px", margin: "4px 0", color: "#d7dadc" }}>{msg.content}</p>}
                            {msg.image && (
                                <img
                                    src={msg.image}
                                    alt="shared"
                                    style={{ maxWidth: "100%", maxHeight: "300px", borderRadius: "8px", marginTop: "8px", border: "1px solid #343536" }}
                                />
                            )}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <div style={{ padding: "20px 40px", background: "#030303" }}>
                <form onSubmit={handleSendMessage} style={{ background: "#1a1a1b", padding: "10px", borderRadius: "8px", border: "1px solid #343536" }}>
                    <textarea
                        placeholder={`Message in ${channel?.name}...`}
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        style={{
                            width: "100%",
                            background: "transparent",
                            border: "none",
                            color: "white",
                            resize: "none",
                            outline: "none",
                            padding: "8px",
                            fontSize: "14px",
                            minHeight: "40px"
                        }}
                    />
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #343536", paddingTop: "10px", marginTop: "5px" }}>
                        <input
                            type="text"
                            placeholder="Image URL (optional)"
                            value={imageLink}
                            onChange={(e) => setImageLink(e.target.value)}
                            style={{
                                background: "transparent",
                                border: "none",
                                color: "#818384",
                                fontSize: "12px",
                                outline: "none",
                                width: "60%"
                            }}
                        />
                        <button
                            type="submit"
                            style={{
                                padding: "6px 20px",
                                background: (newMessage.trim() || imageLink.trim()) ? "#ff4500" : "#343536",
                                color: "white",
                                border: "none",
                                borderRadius: "20px",
                                fontWeight: "bold",
                                cursor: (newMessage.trim() || imageLink.trim()) ? "pointer" : "default"
                            }}
                        >
                            Send
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}


