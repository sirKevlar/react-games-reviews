export default function AddReviewButton({ setReviewFormIsOpen }) {
  return (
    <div
      className="add-review"
      onClick={() => {
        setReviewFormIsOpen(true);
      }}
    >
      <button className="add-review-button">ADD REVIEW</button>
    </div>
  );
}
