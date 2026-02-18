import React, { useState, useEffect, useContext } from "react";
import NavBar from "./navbar";
import api from "../utils/api";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

export default function CommunityHome() {
    const { user } = useContext(AuthContext);
    const [channels, setChannels] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newChannel, setNewChannel] = useState({ name: "", description: "", icon: "" });

    useEffect(() => {
        fetchChannels();
    }, []);

    const fetchChannels = async () => {
        try {
            const { data } = await api.get("/channels");
            setChannels(data);
        } catch (error) {
            console.error("Error fetching channels:", error);
        }
    };

    const handleSearch = async (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        if (value.trim()) {
            try {
                const { data } = await api.get(`/channels/search?query=${value}`);
                setChannels(data);
            } catch (error) {
                console.error("Error searching channels:", error);
            }
        } else {
            fetchChannels();
        }
    };

    const handleCreateChannel = async (e) => {
        e.preventDefault();
        try {
            await api.post("/channels", newChannel);
            setIsModalOpen(false);
            setNewChannel({ name: "", description: "", icon: "" });
            fetchChannels();
        } catch (error) {
            console.error("Error creating channel:", error);
            alert("Failed to create channel.");
        }
    };

    return (
        <div style={{ backgroundColor: "#030303", minHeight: "100vh", marginTop: "50px", color: "#d7dadc" }}>
            <NavBar />
            <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "40px 20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
                    <h1 style={{ fontSize: "28px", fontWeight: "bold" }}>Communities</h1>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        style={{
                            padding: "10px 20px",
                            background: "#ff4500",
                            border: "none",
                            borderRadius: "20px",
                            color: "white",
                            fontWeight: "bold",
                            cursor: "pointer"
                        }}
                    >
                        Create Channel
                    </button>
                </div>

                <div style={{ marginBottom: "30px" }}>
                    <input
                        type="text"
                        placeholder="Search for channels..."
                        value={searchTerm}
                        onChange={handleSearch}
                        style={{
                            width: "100%",
                            padding: "12px 20px",
                            borderRadius: "5px",
                            border: "1px solid #343536",
                            background: "#1a1a1b",
                            color: "white"
                        }}
                    />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
                    {channels.map(channel => (
                        <Link to={`/community/${channel._id}`} key={channel._id} style={{ textDecoration: "none" }}>
                            <div style={{
                                background: "#1a1a1b",
                                padding: "20px",
                                borderRadius: "8px",
                                border: "1px solid #343536",
                                transition: "border-color 0.2s",
                                cursor: "pointer",
                                height: "100%"
                            }}
                                onMouseOver={(e) => e.currentTarget.style.borderColor = "#ff4500"}
                                onMouseOut={(e) => e.currentTarget.style.borderColor = "#343536"}
                            >
                                <div style={{ display: "flex", alignItems: "center", gap: "15px", marginBottom: "10px" }}>
                                    <div style={{
                                        width: "40px",
                                        height: "40px",
                                        borderRadius: "50%",
                                        background: "#272729",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontSize: "20px"
                                    }}>
                                        {channel.icon || "🗨️"}
                                    </div>
                                    <h2 style={{ fontSize: "18px", color: "white", margin: 0 }}>{channel.name}</h2>
                                </div>
                                <p style={{ color: "#818384", fontSize: "14px", overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
                                    {channel.description}
                                </p>
                                <div style={{ marginTop: "15px", fontSize: "12px", color: "#818384" }}>
                                    Created by u/{channel.createdBy?.username}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {isModalOpen && (
                    <div style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: "rgba(0,0,0,0.8)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 1000
                    }}>
                        <div style={{ background: "#1a1a1b", padding: "30px", borderRadius: "10px", width: "400px", border: "1px solid #343536" }}>
                            <h2 style={{ marginBottom: "20px" }}>Create a Channel</h2>
                            <form onSubmit={handleCreateChannel}>
                                <div style={{ marginBottom: "15px" }}>
                                    <label style={{ display: "block", marginBottom: "5px", fontSize: "14px" }}>Name</label>
                                    <input
                                        required
                                        type="text"
                                        value={newChannel.name}
                                        onChange={(e) => setNewChannel({ ...newChannel, name: e.target.value })}
                                        style={{ width: "100%", padding: "10px", background: "#272729", border: "1px solid #343536", color: "white", borderRadius: "4px" }}
                                    />
                                </div>
                                <div style={{ marginBottom: "15px" }}>
                                    <label style={{ display: "block", marginBottom: "5px", fontSize: "14px" }}>Description</label>
                                    <textarea
                                        required
                                        value={newChannel.description}
                                        onChange={(e) => setNewChannel({ ...newChannel, description: e.target.value })}
                                        style={{ width: "100%", padding: "10px", background: "#272729", border: "1px solid #343536", color: "white", borderRadius: "4px", height: "100px" }}
                                    />
                                </div>
                                <div style={{ marginBottom: "20px" }}>
                                    <label style={{ display: "block", marginBottom: "5px", fontSize: "14px" }}>Icon (Emoji)</label>
                                    <input
                                        type="text"
                                        value={newChannel.icon}
                                        placeholder="e.g. 🚀"
                                        onChange={(e) => setNewChannel({ ...newChannel, icon: e.target.value })}
                                        style={{ width: "100%", padding: "10px", background: "#272729", border: "1px solid #343536", color: "white", borderRadius: "4px" }}
                                    />
                                </div>
                                <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
                                    <button type="button" onClick={() => setIsModalOpen(false)} style={{ padding: "8px 16px", background: "transparent", color: "white", border: "1px solid #343536", borderRadius: "4px", cursor: "pointer" }}>Cancel</button>
                                    <button type="submit" style={{ padding: "8px 16px", background: "#ff4500", color: "white", border: "none", borderRadius: "4px", fontWeight: "bold", cursor: "pointer" }}>Create</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
