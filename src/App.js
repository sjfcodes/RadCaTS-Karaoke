import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import KittyHeader from "./components/KittyHeader";
import SearchPage from "./pages/SearchPage";
import EditLyrics from "./pages/EditLyrics";
import Session from "./pages/Session";
import Landing from "./pages/Landing";
import API from "./utils/API";
import "./App.css";

// test
function App() {
  let status, token, id, username, profilePicture, records;
  const userInfo = JSON.parse(localStorage.getItem("radcatsInfo"));
  if (userInfo) {
    status = true;
    token = userInfo.token;
    id = userInfo.id;
    username = userInfo.username;
    records = userInfo.records;
    profilePicture = userInfo.profilePicture;
  } else {
    status = false;
  }

  const [userData, setUserData] = useState({
    isLoggedIn: status,
    token,
    id,
    username,
    profilePicture,
    records,
  });
  const [sessionData, setSessionData] = useState([{ isActive: false }]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [search, setSearch] = useState([""]);

  const authorizeUser = () => {
    if (userInfo) {
      API.checkWebToken(token)
        .then((res) => {
          loginSuccess("checkWebToken", res);
        })
        .catch((err) => {
          console.log("logging out:", err.message);
          localStorage.removeItem("radcatsInfo");
          setUserData({});
        });
    }
  };

  useEffect(() => {
    authorizeUser();
  }, [token]);

  const loginSuccess = (source, res) => {
    console.log(source, res);
    const radcatsInfo = {
      token: res.data.token,
      id: res.data.user._id,
      username: res.data.user.username,
      records: res.data.user.records,
      profilePicture: res.data.user.profilePicture,
    };

    localStorage.setItem("radcatsInfo", JSON.stringify(radcatsInfo));

    setUserData({
      id: res.data.user._id,
      token: res.data.token,
      records: res.data.user.records,
      username: res.data.user.username,
      profilePicture: res.data.user.profilePicture,
      isLoggedIn: true,
    });
  };

  return (
    <Router>
      <KittyHeader isPlaying={isPlaying} />
      <Switch>
        <Route exact path="/">
          <Landing
            userData={userData}
            setUserData={setUserData}
            loginSuccess={loginSuccess}
            setIsPlaying={setIsPlaying}
          />
        </Route>

        <Route exact path="/search">
          <SearchPage
            search={search}
            userData={userData}
            setSearch={setSearch}
            setUserData={setUserData}
            setIsPlaying={setIsPlaying}
          />
        </Route>

        <Route exact path="/lyrics/:id">
          <EditLyrics
            userData={userData}
            setUserData={setUserData}
            sessionData={sessionData}
            setIsPlaying={setIsPlaying}
            setSessionData={setSessionData}
          />
        </Route>

        <Route exact path="/session/:id">
          <Session
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            userData={userData}
            setUserData={setUserData}
            sessionData={sessionData}
            setSessionData={setSessionData}
          />
        </Route>

        {/* <Route exact path="/api/user/:id">
          <Session userData={userData} setUserData={setUserData} />
        </Route> */}
      </Switch>
    </Router>
  );
}

export default App;
