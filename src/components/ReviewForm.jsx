import { useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { postReview, postComment, postCategory } from "../utils/apiCall";

export default function ReviewForm({
  categories,
  setReviewFormIsOpen,
  reviews,
  setReviews,
}) {
  const { user } = useContext(UserContext);
  const [gameTitle, setGameTitle] = useState("");
  const [gameDesigner, setGameDesigner] = useState("");
  const [gameImageUrl, setGameImageUrl] = useState(
    "https://picsum.photos/200/300"
  );
  const [gameCategory, setGameCategory] = useState("strategy");
  const [gameReview, setGameReview] = useState("");
  const [gameCategoryDescription, setGameCategoryDescription] = useState(
    "Category description"
  );
  const [isValidCategory, setIsValidCategory] = useState(true);
  const isCategoryOther = (category) => {
    if (category === "other") {
      setIsValidCategory(false);
      setGameCategory("Insert Category");
    }
  };
  const noComment = {
    username: user.username,
    body: "No one left any comments yet 😢",
  };

  return (
    <div className="enter-review">
      <form action="" className="enter-review-form">
        <h3>Express your opinion on something 😏 ...</h3>
        <ul>
          <li>
            <label htmlFor="game-title">
              Title
              <input
                required
                className="review-input-field"
                type="text"
                id="game-title"
                value={gameTitle}
                onChange={(e) => setGameTitle(e.target.value)}
              />
            </label>
          </li>
          <li>
            <label htmlFor="game-designer">
              Designer
              <input
                required
                className="review-input-field"
                type="text"
                id="game-designer"
                value={gameDesigner}
                onChange={(e) => setGameDesigner(e.target.value)}
              />
            </label>
          </li>
          <li>
            <label htmlFor="game-img-url">
              Image URL
              <input
                required
                className="review-input-field"
                type="text"
                id="game-img-url"
                value={gameImageUrl}
                onChange={(e) => setGameImageUrl(e.target.value)}
              />
            </label>
          </li>
          <li>
            <label htmlFor="game-category">
              Category
              {isValidCategory ? (
                <select
                  className="review-input-field"
                  name="game-category"
                  id="game-category"
                  onChange={(e) => {
                    setGameCategory(e.target.value);
                    isCategoryOther(e.target.value);
                  }}
                >
                  {categories.map((category) => {
                    return (
                      <option key={category.slug} value={category.slug}>
                        {category.slug}
                      </option>
                    );
                  })}
                  <option value="other">other</option>
                </select>
              ) : (
                <div>
                  <input
                    required
                    className="review-input-field"
                    type="text"
                    id="game-category"
                    value={gameCategory}
                    onChange={(e) => {
                      setGameCategory(e.target.value);
                    }}
                  />
                  <input
                    required
                    className="review-input-field"
                    type="text"
                    id="game-category-description"
                    value={gameCategoryDescription}
                    onChange={(e) => setGameCategoryDescription(e.target.value)}
                  />
                </div>
              )}
            </label>
          </li>
          <li>
            <label htmlFor="game-reiview">
              Review
              <input
                className="review-input-field"
                type="text"
                id="game-review"
                value={gameReview}
                onChange={(e) => setGameReview(e.target.value)}
              />
            </label>
          </li>
        </ul>
        <button
          onClick={(e) => {
            e.preventDefault();
            const newReviews = [
              {
                owner: user.username,
                comment_count: 0,
                category: gameCategory,
                review_img_url: gameImageUrl,
                title: gameTitle,
              },
              ...reviews,
            ];
            setReviews(newReviews);
            if (gameCategoryDescription !== "Category description") {
              const categoryPost = {
                slug: gameCategory,
                description: gameCategoryDescription,
                owner: user.username,
              };
              postCategory(categoryPost).then(() => {
                postReview(
                  user.username,
                  gameTitle,
                  gameDesigner,
                  gameImageUrl,
                  gameCategory,
                  gameReview
                ).then((response) => {
                  const newReviews = [response.data.review, ...reviews];
                  setReviews(newReviews);
                  postComment(response.data.review.review_id, noComment);
                });
              });
            } else {
              postReview(
                user.username,
                gameTitle,
                gameDesigner,
                gameImageUrl,
                gameCategory,
                gameReview
              ).then((response) => {
                const newReviews = [response.data.review, ...reviews];
                setReviews(newReviews);
                postComment(response.data.review.review_id, noComment);
              });
            }
            setReviewFormIsOpen(false);
          }}
          className="add-review-button"
        >
          SUBMIT
        </button>
        <br />
        <button
          onClick={(e) => {
            e.preventDefault();
            setReviewFormIsOpen(false);
          }}
          className="add-review-button"
        >
          CLOSE FORM
        </button>
      </form>
    </div>
  );
}
