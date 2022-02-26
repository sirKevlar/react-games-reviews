import "./App.css";
import Header from "./components/Header";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./contexts/UserContext";
import RequireLogin from "./components/RequireLogin";
import Main from "./pages/Main";
import logoutIcon from "./assets/logout (1).png";

function App() {
  const { isLoggedIn, logout } = useContext(UserContext);
  const [reviews, setReviews] = useState([]);
  const [usersFromApi, setUsersFromApi] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  return (
    <div className="App">
      <Header
        setSelectedCategory={setSelectedCategory}
        setReviews={setReviews}
        id="test"
      />
      <div className="under-header">
        <RequireLogin
          usersFromApi={usersFromApi}
          setUsersFromApi={setUsersFromApi}
        >
          {isLoggedIn ? (
            <div>
              <Link to="/">
                <div className="logout" onClick={logout}>
                  <img
                    className="logout-icon"
                    src={logoutIcon}
                    alt="logout icon"
                  />
                </div>
              </Link>
              <Main
                reviews={reviews}
                setReviews={setReviews}
                usersFromApi={usersFromApi}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />
            </div>
          ) : (
            <p>Do nothing</p>
          )}
        </RequireLogin>
      </div>
    </div>
  );
}

export default App;
