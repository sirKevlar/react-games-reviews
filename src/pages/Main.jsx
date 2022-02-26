import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Reviews from "./Reviews";
import ReviewById from "./ReviewById";

export default function Main({
  reviews,
  setReviews,
  selectedCategory,
  setSelectedCategory,
}) {
  const [categories, setCategories] = useState([]);

  return (
    <div>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Reviews
              reviews={reviews}
              setReviews={setReviews}
              categories={categories}
              setCategories={setCategories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          }
        />
        <Route
          exact
          path="/reviews"
          element={
            <Reviews
              reviews={reviews}
              setReviews={setReviews}
              categories={categories}
              setCategories={setCategories}
            />
          }
        />
        <Route
          exact
          path="/reviews/:reviewId"
          element={<ReviewById reviews={reviews} setReviews={setReviews} />}
        />
      </Routes>
    </div>
  );
}
