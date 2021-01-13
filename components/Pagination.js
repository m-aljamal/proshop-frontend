const Pagination = ({ totalNumber, router }) => {
  return (
    <div style={{ display: "flex" }}>
      {[...Array(totalNumber).keys()].map((x, i) => (
        <p
          key={i}
          style={{ marginRight: "10px", cursor: "pointer" }}
          onClick={() => router.push(`/products?page=${i + 1}`)}
        >
          {" "}
          {i + 1}
        </p>
      ))}
    </div>
  );
};

export default Pagination;
