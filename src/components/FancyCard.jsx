export default function FancyCard({ children, commentBody, className }) {
  const classToAdd = "fancy-card " + className;

  return (
    <section key={commentBody} className={classToAdd}>
      {children}
    </section>
  );
}
