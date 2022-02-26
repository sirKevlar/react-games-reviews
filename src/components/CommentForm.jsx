import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { postComment } from "../utils/apiCall";

export default function CommentForm({
  reviewId,
  review,
  comments,
  setComments,
  setCommentCount,
}) {
  const { user } = useContext(UserContext);
  const [addComment, setAddComment] = useState("");

  return (
    <form className="comment-input">
      <input
        id="comment-textbox"
        type="text"
        placeholder="Leave your comment here..."
        value={addComment}
        onChange={(e) => setAddComment(e.target.value)}
      />
      <button
        className="post-button"
        onClick={(e) => {
          e.preventDefault();
          const commentToInsert = {
            username: user.username,
            body: addComment,
          };
          const newComments = [commentToInsert, ...comments];
          const newCommentCount = (Number(review.comment_count) + 1).toString();
          setCommentCount(newCommentCount);
          postComment(reviewId, commentToInsert)
            .then((res) => {
              setAddComment("");
            })
            .catch((err) => {
              console.log(err);
            });
          setComments(newComments);
        }}
      >
        POST
      </button>
    </form>
  );
}
