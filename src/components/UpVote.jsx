import { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { upVote } from "../utils/apiCall";
import { downVote } from "../utils/apiCall";

export default function UpVote({ recievedVotes, id, addClass, type, author }) {
  const { user } = useContext(UserContext);
  const [votes, setVotes] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const classToAdd = `vote-button-${type}`;

  useEffect(() => {
    setVotes(recievedVotes);
    setIsLoading(false);
  }, [recievedVotes]);

  if (isLoading) return <h5>Be Patient...</h5>;

  return (
    <div className="review-sub-two">
      <h5 className={addClass}>VOTES {votes}</h5>
      <div>
        <button
          disabled={votes === undefined || author === user.username}
          onClick={() => {
            setVotes((currVotes) => {
              return currVotes + 1;
            });
            upVote(id, type);
          }}
          className={classToAdd}
        >
          🔼
        </button>
        <button
          disabled={
            votes < 1 || votes === undefined || author === user.username
          }
          onClick={() => {
            setVotes((currVotes) => {
              return currVotes - 1;
            });
            downVote(id, type);
          }}
          className={classToAdd}
        >
          🔽
        </button>
      </div>
    </div>
  );
}
