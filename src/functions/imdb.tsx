const imdb = (rating) => {
  const maxStars = 5;
  const fullStars = Math.floor(rating / 2);
  const halfStar = rating % 2 === 1 ? 1 : 0;

  const stars = [];
  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <span key={i} style={{ color: "orange", margin: "0" }}>
        ★
      </span>
    );
  }
  if (halfStar === 1) {
    stars.push(
      <span key="half" style={{ color: "orange", margin: "0" }}>
        ½
      </span>
    );
  }
  for (let i = 0; i < maxStars - fullStars - halfStar; i++) {
    stars.push(
      <span key={`empty-${i}`} style={{ margin: "0" }}>
        ★
      </span>
    );
  }

  const ratingText = (
    <span>
      {stars} <span style={{ marginLeft: "6px" }}>{rating.toFixed(1)}</span>
    </span>
  );
  return ratingText;
};

export default imdb;
