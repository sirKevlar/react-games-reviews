import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import FancyCard from "../components/FancyCard";
import UpVote from "../components/UpVote";
import {
  getReviewById,
  getCommentsByReviewId,
  deleteCommentById,
  deleteReviewById,
} from "../utils/apiCall";
import CommentForm from "../components/CommentForm";

export default function ReviewById({ reviews, setReviews }) {
  const { user } = useContext(UserContext);
  const [review, setReview] = useState([]);
  const [commentCount, setCommentCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [wasDeletePressed, setWasDeletePressed] = useState(false);
  const { reviewId } = useParams();

  useEffect(() => {
    getReviewById(reviewId).then((reviewFromApi) => {
      setReview(reviewFromApi);
      setCommentCount(reviewFromApi.comment_count);
      setIsLoading(false);
    });
  }, [reviewId]);

  useEffect(() => {
    getCommentsByReviewId(reviewId).then((commentsFromApi) => {
      setComments(commentsFromApi);
    });
  }, [reviewId]);

  if (isLoading) return <h2>Be Patient...</h2>;

  return (
    <main>
      <h2>Check this review...</h2>
      <FancyCard>
        <h5>{review.title}</h5>
        <img
          className="large-image"
          src={review.review_img_url}
          alt={review.title}
        />
        <h5>Category: {review.category}</h5>
        <h5>Comment Count: {commentCount}</h5>
        <h5>Contributor: {review.owner}</h5>
        <h6 className="review-body">{review.review_body}</h6>
        <div className="review-votes-section">
          <div className="delete-mirror">
            <button className="delete-review-button hidden">❌</button>
          </div>
          <UpVote
            author={review.owner}
            id={review.review_id}
            recievedVotes={review.votes}
            type="review"
          />
          <div className="delete-review">
            <button
              disabled={wasDeletePressed || user.username !== review.owner}
              className="delete-review-button"
              onClick={() => {
                setWasDeletePressed(true);
              }}
            >
              ❌
            </button>
          </div>
        </div>
        {wasDeletePressed && (
          <div>
            <h6 className="delete-warning">ARE YOU SURE YOU WANT TO DELETE?</h6>
            <Link to="/reviews">
              <button
                className="delete-confirm-button"
                onClick={() => {
                  comments.forEach((comment) => {
                    deleteCommentById(comment.comment_id);
                  });
                  console.log(review.review_id);
                  //THIS LOG PREVENTS THE NEXT FUNCTION FROM ERRORING???
                  deleteReviewById(review.review_id)
                    .then(() => {
                      const newReviews = reviews.filter(
                        (filteredReview) =>
                          filteredReview.review_id !== review.review_id
                      );
                      setReviews(newReviews);
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                }}
              >
                Hell Yeah!
              </button>
            </Link>
            <button
              className="delete-confirm-button"
              onClick={() => {
                setWasDeletePressed(false);
              }}
            >
              Wait No!
            </button>
          </div>
        )}
      </FancyCard>
      <CommentForm
        reviewId={reviewId}
        review={review}
        comments={comments}
        setComments={setComments}
        setCommentCount={setCommentCount}
      />
      {comments.map((comment) => {
        const deleteCommentId = `delete-comment-${comment.comment_id}`;

        return (
          <FancyCard key={comment.body} commentBody={comment.body}>
            <div className="comments">
              <h5 className="comments-h5">
                {comment.author || comment.username}
              </h5>
              <div className="comments-bottom">
                <div className="comment-body">
                  <h6>{comment.body}</h6>
                  <button
                    disabled={
                      user.username !== comment.author ||
                      review.comment_count < 2
                    }
                    onClick={(e) => {
                      const newComments = comments.filter((comment) => {
                        return comment.comment_id !== Number(e.target.value);
                      });
                      setComments(newComments);
                      const newCommentCount = (
                        Number(review.comment_count) - 1
                      ).toString();
                      setCommentCount(newCommentCount);
                      const newReview = { ...review };
                      newReview.comment_count = newCommentCount;
                      deleteCommentById(e.target.value).then((res) => {
                        setReview(newReview);
                      });
                    }}
                    className="delete-comment-button"
                    id={deleteCommentId}
                    value={comment.comment_id}
                  >
                    ❌
                  </button>
                </div>
                <div className="small-votes">
                  <UpVote
                    author={comment.author}
                    addClass="comment-vote"
                    id={comment.comment_id}
                    recievedVotes={comment.votes}
                    type="comment"
                  />
                </div>
              </div>
            </div>
          </FancyCard>
        );
      })}
    </main>
  );
}
