import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import FancyCard from "../components/FancyCard";
import history from "../utils/history";

const randomFact = [
  "I love to walk barefoot over hot coals to impress local wildlife",
  "I watch the people who walk past my office window and name them all Clive",
  "I lick all the spoons in the cutlery drawer then put them back",
  "I once got the autograph of the dog who played Beethoven in the movie",
  "For most of my childhood I thought that 12 was the largest number in the world",
  "I once cried for 2 hours after watching a documentary about Steve Irwin",
  "I can lick my own ear",
];

export default function Users({ usersFromApi }) {
  const { setUser } = useContext(UserContext);

  return (
    <div className="users">
      {usersFromApi.map((user, i) => {
        const url = `https://i.pravatar.cc/25${i}`;
        const searchUrl = `https://google.com/search?q=${user.username}`;
        return (
          <FancyCard key={user.username} className="user-card">
            <div className="username-align">
              <h3
                className="username-link"
                onClick={() => history.push(searchUrl)}
              >
                {user.username}
              </h3>
            </div>
            <img src={url} alt="random headshot" />
            <h5 className="fun-fact">Fun Fact: {randomFact[i]}</h5>
            <h6>click my name to see what Google has to say about me</h6>
            <button
              onClick={() => {
                setUser({ username: user.username });
              }}
              className="change-user-button"
            >
              CHANGE USER
            </button>
          </FancyCard>
        );
      })}
    </div>
  );
}
