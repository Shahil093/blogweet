import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {signUserAccountOut} from "./utils/firebase";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CreatePost from "./pages/CreatePost";
import Sidebar from "./components/SideBar/Sidebar";
import SidebarOnDesktop from "./components/SidebarOnDesktop/SidebarOnDesktop";
import Blogpost from "./pages/Blogpost";
import UserInfo from "./pages/UserInfo";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound404 from "./pages/NotFound404";

import './shimmer.css';

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  const signUserOut = async () => {
    await signUserAccountOut();
    localStorage.clear();
    setIsAuth(false);
    window.location.pathname = "/login";
  };
  let width = 1000;

  width = window.screen.width;

  return (
    <><><Router>
      {width < 500 && <Sidebar isAuth={isAuth} signUserOut={signUserOut} />}
      {width > 500 && (
        <SidebarOnDesktop isAuth={isAuth} signUserOut={signUserOut} />
      )}
      <Routes>
        <Route path="/" element={<Home isAuth={isAuth} />} />
        <Route path="/createpost" element={<CreatePost isAuth={isAuth} />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
        <Route path="/user/:username" element={<UserInfo />} />
        <Route path="/user/:username/:blogname" element={<Blogpost />} />
        <Route path="*" element={<NotFound404 />} />
      </Routes>
    </Router><div>
        {isLoading ? (
          <div className="shimmer-effect" style={{ height: '100px', width: '100%' }} />
        ) : (

          <div>
            <h1>Welcome to MyPage</h1>
            <p>loading.....</p>
          </div>
        )}
      </div></><div className="App">
        <div className="image-container">
          <img src="src\assets\svg-icons\banner.jpg" alt="Component Image" />
        </div>
        <div className="App-content">
        </div>
      </div></>

  );
}

export default App;
