import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import NavBar from "./navbar";
import AuthContext from "../context/AuthContext";
import api from "../utils/api";
import "../Stylesheets/profile.css"; // We'll create this or reuse existing styles

export default function ProfilePage() {
    const { username } = useParams(); // Get username from URL
    const { user: currentUser } = useContext(AuthContext); // Get logged-in user
    const [profile, setProfile] = useState(null);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);

    // Edit logic state
    const [editBio, setEditBio] = useState("");
    const [editPic, setEditPic] = useState("");

    const fetchProfile = async () => {
        try {
            const { data } = await api.get(`/users/${username}`);
            setProfile(data.user);
            setPosts(data.posts);
            setEditBio(data.user.bio || "");
            setEditPic(data.user.profilePic || "");
            setLoading(false);
        } catch (error) {
            console.error("Error fetching profile:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, [username]);

    const handleFollow = async () => {
        try {
            await api.put(`/users/follow/${profile._id}`);
            fetchProfile(); // Refresh to update follower count
        } catch (error) {
            console.error("Error following user:", error);
        }
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        try {
            await api.put("/users/update", { bio: editBio, profilePic: editPic });
            setIsEditing(false);
            fetchProfile();
        } catch (error) {
            alert("Failed to update profile");
        }
    };

    if (loading) return <div style={{ color: "white", textAlign: "center", marginTop: "20px" }}>Loading profile...</div>;

    if (!profile) return <div style={{ color: "white", textAlign: "center", marginTop: "20px" }}>User not found</div>;

    const isOwnProfile = currentUser && currentUser.username === profile.username;
    const isFollowing = currentUser && profile.followers.some(follower => follower._id === currentUser.id || follower === currentUser.id);

    return (
        <>
            <NavBar />
            <div className="profile-container" style={{ maxWidth: "800px", margin: "20px auto", color: "white" }}>
                {/* Header Section */}
                <div className="profile-header" style={{ display: "flex", alignItems: "center", gap: "20px", padding: "20px", background: "#1a1a1b", borderRadius: "5px" }}>
                    <img
                        src={profile.profilePic || "https://www.redditstatic.com/avatars/avatar_default_02_A5A4A4.png"}
                        alt="avatar"
                        style={{ width: "100px", height: "100px", borderRadius: "50%", objectFit: "cover" }}
                    />
                    <div style={{ flex: 1 }}>
                        <h1 style={{ margin: 0 }}>{profile.username}</h1>
                        <p style={{ color: "#818384" }}>u/{profile.username}</p>
                        <div style={{ display: "flex", gap: "15px", margin: "10px 0" }}>
                            <span><strong>{posts.length}</strong> Posts</span>
                            <span><strong>{profile.followers.length}</strong> Followers</span>
                            <span><strong>{profile.following.length}</strong> Following</span>
                        </div>
                        {!isEditing && <p>{profile.bio}</p>}

                        {isOwnProfile ? (
                            !isEditing ? (
                                <button className="auth-btn" onClick={() => setIsEditing(true)}>Edit Profile</button>
                            ) : (
                                <form onSubmit={handleUpdateProfile} style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "10px" }}>
                                    <input className="login-input" placeholder="Bio" value={editBio} onChange={e => setEditBio(e.target.value)} />
                                    <input className="login-input" placeholder="Profile Pic URL" value={editPic} onChange={e => setEditPic(e.target.value)} />
                                    <div style={{ display: "flex", gap: "10px" }}>
                                        <button className="login-btn" type="submit">Save</button>
                                        <button className="login-btn" type="button" onClick={() => setIsEditing(false)} style={{ background: "gray" }}>Cancel</button>
                                    </div>
                                </form>
                            )
                        ) : (
                            currentUser && <button className="auth-btn" onClick={handleFollow}>
                                {isFollowing ? "Unfollow" : "Follow"}
                            </button>
                        )}
                    </div>
                </div>

                {/* User Posts Section */}
                <h3 style={{ marginTop: "30px", borderBottom: "1px solid #343536", paddingBottom: "10px" }}>Posts</h3>
                <div className="posts-list">
                    {posts.map(post => (
                        <div key={post._id} style={{ background: "#1a1a1b", padding: "15px", margin: "10px 0", borderRadius: "5px", border: "1px solid #343536" }}>
                            <h4>{post.title}</h4>
                            <p style={{ fontSize: "14px", color: "#d7dadc" }}>{post.content.substring(0, 100)}...</p>
                            {post.image && <img src={post.image} alt="post" style={{ maxHeight: "200px", borderRadius: "5px", marginTop: "10px" }} />}
                            <div style={{ marginTop: "10px", fontSize: "12px", color: "#818384" }}>
                                ⬆️ {post.likes.length} Likes • 💬 {post.comments.length} Comments
                            </div>
                        </div>
                    ))}
                    {posts.length === 0 && <p style={{ textAlign: "center", color: "#818384", marginTop: "20px" }}>No posts yet</p>}
                </div>
            </div>
        </>
    );
}
