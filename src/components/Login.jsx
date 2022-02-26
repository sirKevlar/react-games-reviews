import { useContext, useState, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import { getUsers } from "../utils/apiCall";

const Login = ({ usersFromApi, setUsersFromApi }) => {
  const [username, setUsername] = useState("");
  const [userIsNotValid, setUserIsNotValid] = useState(false);
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    getUsers().then((users) => {
      setUsersFromApi(users);
    });
  }, [setUsersFromApi]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const matchingUser = usersFromApi.find((user) => {
      return user.username === username;
    });

    if (matchingUser) {
      setUser(matchingUser);
    } else {
      setUserIsNotValid(true);
      setTimeout(() => {
        setUserIsNotValid(false);
      }, 2000);
    }
  };

  return (
    <main className="login-page">
      <form className="login-contents" onSubmit={handleSubmit}>
        <h2 id="user-heading">PLEASE ENTER USERNAME</h2>
        {userIsNotValid && (
          <div className="warning">
            <h3>WARNING: {username}'s not a user I recognise 🥲</h3>
          </div>
        )}
        <label>
          Username:
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></input>
        </label>
      </form>
    </main>
  );
};

export default Login;
