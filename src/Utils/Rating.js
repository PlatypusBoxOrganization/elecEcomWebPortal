const Rating = ({ value }) => {
  const fullStar = "fa-solid fa-star";
  const halfStar = "fa-solid fa-star-half";

  return (
    <div className="Rating">
      <span>
        <i
          style={{ color: "#FFD43B" }}
          className={value >= 1 ? fullStar : value >= 0.5 ? halfStar : null}
        ></i>
      </span>
      <span>
        <i
          style={{ color: "#FFD43B" }}
          className={value >= 2 ? fullStar : value >= 1.5 ? halfStar : null}
        ></i>
      </span>
      <span>
        <i
          style={{ color: "#FFD43B" }}
          className={value >= 3 ? fullStar : value >= 2.5 ? halfStar : null}
        ></i>
      </span>
      <span>
        <i
          style={{ color: "#FFD43B" }}
          className={value >= 4 ? fullStar : value >= 3.5 ? halfStar : null}
        ></i>
      </span>
      <span>
        <i
          style={{ color: "#FFD43B" }}
          className={value >= 5 ? fullStar : value >= 4.5 ? halfStar : null}
        ></i>
      </span>
    </div>
  );
};

export default Rating;
