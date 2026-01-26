import { useState } from "react";
import Login from "./pages/login";
import Details from "./pages/details";
import Dashboard from "./pages/dashboard";
import { Routes, Route } from "react-router-dom";
import PostPage from "./pages/postpage";
import SinglePostPage from "./pages/singlepostpage";

function App() {
  const [user, setUser] = useState(null);

  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />

      <Route
        path="/login"
        element={<Login setUser={setUser} />}
      />

      <Route
        path="/details"
        element={<Details user={user} />}
      />

      <Route
        path="/postpage"
        element={<PostPage />}
      />

      <Route 
        path="/post/:id" 
        element={<SinglePostPage />} />
    </Routes>
  );
}

export default App;
