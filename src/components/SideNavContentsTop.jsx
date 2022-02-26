import React from "react";
import { getReviews } from "../utils/apiCall";

export default function SideNavContentsTop({
  categories,
  setSelectedCategory,
  setReviews,
}) {
  return (
    <div className="sidenav-top">
      {categories.map((category) => {
        return (
          <div
            onClick={(e) => {
              setSelectedCategory(category.slug);
              getReviews(category.slug).then((reviews) => {
                setReviews(reviews);
              });
            }}
            className="category"
            value={category.slug}
            id={category.slug}
            key={category.slug}
          >
            <h6 className="slug">{category.slug}</h6>
          </div>
        );
      })}
    </div>
  );
}
