import React from "react";
import { getReviews } from "../utils/apiCall";

export default function SideNavContentsBottom({
  sortBy,
  setSortBy,
  order,
  setOrder,
  selectedCategory,
  setReviews,
}) {
  return (
    <div className="sidenav-bottom white">
      <div className="sidenav-bottom-top">
        <h5 className="white sort-title">Sort By:</h5>
        <div className="sort-radio">
          <div className="sort-radio-left">
            <div className="radio-pairs">
              <input
                onChange={({ target: { value } }) => {
                  setSortBy(value);
                  getReviews(selectedCategory, value, order).then(
                    (reviewsFromApi) => {
                      setReviews(reviewsFromApi);
                    }
                  );
                }}
                type="radio"
                name="sort-by"
                value="title"
              />
              <label className="radio-label" htmlFor="title">
                TITLE
              </label>
            </div>
            <div className="radio-pairs">
              <input
                onChange={({ target: { value } }) => {
                  setSortBy(value);
                  getReviews(selectedCategory, value, order).then(
                    (reviewsFromApi) => {
                      setReviews(reviewsFromApi);
                    }
                  );
                }}
                type="radio"
                name="sort-by"
                value="votes"
              />
              <label className="radio-label" htmlFor="votes">
                VOTES
              </label>
            </div>
          </div>
          <div className="sort-radio-right">
            <div className="radio-pairs">
              <input
                onChange={({ target: { value } }) => {
                  setSortBy(value);
                  getReviews(selectedCategory, value, order).then(
                    (reviewsFromApi) => {
                      setReviews(reviewsFromApi);
                    }
                  );
                }}
                type="radio"
                name="sort-by"
                value="owner"
              />
              <label className="radio-label" htmlFor="owner">
                OWNER
              </label>
            </div>
            <div className="radio-pairs">
              <input
                onChange={({ target: { value } }) => {
                  setSortBy(value);
                  getReviews(selectedCategory, value, order).then(
                    (reviewsFromApi) => {
                      setReviews(reviewsFromApi);
                    }
                  );
                }}
                type="radio"
                name="sort-by"
                value="created_at"
              />
              <label className="radio-label" htmlFor="created">
                CREATED
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="sidenav-bottom-bottom">
        <h5 id="order-by" className="white sort-title">
          Order By:
        </h5>
        <div className="sort-radio">
          <div className="radio-pairs">
            <input
              onChange={({ target: { value } }) => {
                setOrder(value);
                getReviews(selectedCategory, sortBy, value).then(
                  (reviewsFromApi) => {
                    setReviews(reviewsFromApi);
                  }
                );
              }}
              type="radio"
              name="order"
              value="asc"
            />
            <label className="radio-label" htmlFor="asc">
              ASC
            </label>
          </div>
          <div className="radio-pairs">
            <input
              onChange={({ target: { value } }) => {
                setOrder(value);
                getReviews(selectedCategory, sortBy, value).then(
                  (reviewsFromApi) => {
                    setReviews(reviewsFromApi);
                  }
                );
              }}
              type="radio"
              name="order"
              value="desc"
            />
            <label className="radio-label" htmlFor="desc">
              DESC
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
