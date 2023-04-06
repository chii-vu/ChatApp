import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import { AuthContext } from "./helpers/AuthContext";
import Registration from "./components/Registration";
import Login from "./components/Login";

import HomePage from "./pages/HomePage";
import Channel from "./pages/Channel";
import Post from "./pages/Post";
import PageNotFound from "./pages/PageNotFound";
import Profile from "./pages/Profile";
import ChangePassword from "./components/ChangePassword";
import AllPosts from "./pages/AllPosts";
import UsersList from "./pages/UsersList";


function App() {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
    isAdmin: false,
  });

  useEffect(() => {
    axios
      .get("http://localhost:8081/auth/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
            isAdmin: response.data.isAdmin,
          });
        }
      });
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ username: "", id: 0, status: false, isAdmin: false }); // reset isAdmin flag on logout
    window.location.href = "/login";
  };

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <div className="navbar">
            <div className="links">
              {!authState.status ? (
                <>
                  <Link to="/login"> Login</Link>
                  <Link to="/registration"> Registration</Link>
                </>
              ) : (
                <>
                  <Link to="/"> Channels </Link>
                  <Link to="/userslist"> Users </Link>
                  <Link to="/allposts"> Posts </Link>
                </>
              )}
            </div>
            <div className="loggedInContainer">
              <h1>{authState.username} </h1>
              {authState.status && <button onClick={logout}> Sign Out</button>}
            </div>
          </div>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/allposts" element={<AllPosts />} />
            <Route path="/userslist" element={<UsersList />} />
            <Route path="/channel/:id" element={<Channel />} />
            <Route path="/post/:id" element={<Post />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/changepassword" element={<ChangePassword />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;