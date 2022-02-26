import React from "react";
import { Link } from "react-router-dom";
import gameLogo from "../assets/gameLogo.png";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { getReviews } from "../utils/apiCall";

const userDisplayNames = {
  tickle122: "tickle",
  jessjelly: "jess",
  grumpy19: "grumpy",
  happyamy2016: "happyamy",
  cooljmessy: "coolj",
  weegembump: "weegem",
};

export default function Header({ setReviews, setSelectedCategory }) {
  const { user } = useContext(UserContext);

  return (
    <header className="header">
      <Link to="/">
        <img
          onClick={() => {
            getReviews().then((reviewsFromApi) => {
              setSelectedCategory("");
              setReviews(reviewsFromApi);
            });
          }}
          className="header-content"
          src={gameLogo}
          alt="Game logo, rubix icon from Freepic"
        />
      </Link>
      <div id="user-icon" className="header-content">
        {user.username ? (
          <Link id="username" className="link" to="/users">
            {userDisplayNames[user.username]}
          </Link>
        ) : (
          "Sign In"
        )}
      </div>
    </header>
  );
}
