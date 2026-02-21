const Pagination = (props) => {
  const { currentPage, setCurrentPage, totalPages } = props;

  const prevPage = () => {
    setCurrentPage((prev) => --prev);
  };
  const nextPage = () => {
    setCurrentPage((prev) => ++prev);
  };

  return (
    <div className="bg-gradient-to-r from-fuchsia-200 via-black/50 to-fuchsia-200 flex justify-center gap-10 py-2">
      <button
        className={`text-white px-2   ${currentPage == 0 ? "cursor-not-allowed" : "cursor-pointer"}`}
        onClick={() => setCurrentPage(0)}
      >
        <i className="fa-solid fa-angles-left"></i>
      </button>
      <button
        className={`border border-white px-2 rounded-md  ${currentPage == 0 ? "cursor-not-allowed" : "cursor-pointer"}`}
        onClick={prevPage}
        disabled={currentPage == 0}
      >
        <i className="fa-solid fa-angle-left text-white"></i>
      </button>
      <div className="text-white">page {currentPage + 1}</div>
      <button
        className={`border border-white px-2 rounded-md  ${currentPage == totalPages - 1 ? "cursor-not-allowed" : "cursor-pointer"}`}
        onClick={nextPage}
        disabled={currentPage == totalPages - 1}
      >
        <i className="fa-solid fa-angle-right text-white"></i>
      </button>
      <button
        className={`text-white px-2   ${currentPage == totalPages - 1 ? "cursor-not-allowed" : "cursor-pointer"}`}
        onClick={() => setCurrentPage(totalPages - 1)}
      >
        <i className="fa-solid fa-angles-right"></i>
      </button>
    </div>
  );
};

export default Pagination;
