import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/login";
import Register from "./pages/register";
import Details from "./pages/details";
import Dashboard from "./pages/dashboard";
import { Routes, Route } from "react-router-dom";
import PostPage from "./pages/postpage";
import SinglePostPage from "./pages/singlepostpage";
import ProfilePage from "./pages/profile";
import SearchPage from "./pages/search";
import AdminPage from "./pages/AdminPage";
import SubgredditPage from "./pages/SubgredditPage";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/details" element={<Details />} />
        <Route path="/postpage" element={<PostPage />} />
        <Route path="/profile/:username" element={<ProfilePage />} />
        <Route path="/post/:id" element={<SinglePostPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/subgreddit" element={<SubgredditPage />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
