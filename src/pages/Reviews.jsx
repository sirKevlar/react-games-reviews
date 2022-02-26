import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FancyCard from "../components/FancyCard";
import SideNav from "../components/SideNav";
import UpVote from "../components/UpVote";
import ReviewForm from "../components/ReviewForm";
import AddReviewButton from "../components/AddReviewButton";
import { getReviews, getCategories } from "../utils/apiCall";
import SideNavContentsTop from "../components/SideNavContentsTop";
import SideNavContentsBottom from "../components/SideNavContentsBottom";

export default function Reviews({
  reviews,
  setReviews,
  categories,
  setCategories,
  selectedCategory,
  setSelectedCategory,
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [reviewFormIsOpen, setReviewFormIsOpen] = useState(false);
  const [sortBy, setSortBy] = useState("");
  const [order, setOrder] = useState("desc");

  useEffect(() => {
    getReviews().then((reviewsFromApi) => {
      setReviews(reviewsFromApi);
      setIsLoading(false);
    });
  }, [setReviews]);

  useEffect(() => {
    getCategories().then((categoriesFromApi) => {
      setCategories(categoriesFromApi);
      setIsLoading(false);
    });
  }, [setCategories]);

  if (isLoading) return <h2>Be Patient...</h2>;

  return (
    <main>
      <SideNav>
        <SideNavContentsTop
          categories={categories}
          setSelectedCategory={setSelectedCategory}
          setReviews={setReviews}
        />
        <SideNavContentsBottom
          sortBy={sortBy}
          setSortBy={setSortBy}
          order={order}
          setOrder={setOrder}
          selectedCategory={selectedCategory}
          setReviews={setReviews}
        />
      </SideNav>
      <h2>Reviews...</h2>
      <FancyCard>
        {reviewFormIsOpen ? (
          <ReviewForm
            reviews={reviews}
            setReviews={setReviews}
            categories={categories}
            setReviewFormIsOpen={setReviewFormIsOpen}
          />
        ) : (
          <AddReviewButton setReviewFormIsOpen={setReviewFormIsOpen} />
        )}
      </FancyCard>

      {reviews.map((review) => {
        const reviewUrl = `/reviews/${review.review_id}`;

        return (
          <div key={review.title} className="rev-card">
            <FancyCard>
              <div className="review-sub-one">
                <img
                  src={review.review_img_url}
                  alt={review.title}
                  className="review-image"
                />
                <UpVote
                  author={review.owner}
                  addClass="review-votes"
                  id={review.review_id}
                  recievedVotes={review.votes}
                  type="reviews"
                />
              </div>
              <Link className="link" to={reviewUrl}>
                <h3 className="review-title">{review.title}</h3>
              </Link>
              <h5 className="review-category">Category: {review.category}</h5>
            </FancyCard>
          </div>
        );
      })}
    </main>
  );
}
