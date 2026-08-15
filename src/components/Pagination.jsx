const Pagination = (props) => {
  const { currentPage, setCurrentPage, totalPages } = props;

  const prevPage = () => {
    setCurrentPage((prev) => prev-1);
  };
  const nextPage = () => {
    setCurrentPage((prev) => prev+1);
  };

  if (!totalPages || totalPages <= 1) return null;

  return (
    <div className="bg-gradient-to-r from-fuchsia-200 via-black/50 to-fuchsia-200 flex justify-center gap-2 sm:gap-4 md:gap-6 lg:gap-10 py-2 sm:py-3 px-2 flex-wrap">
      <button
        className={`text-white px-1.5 sm:px-2 text-sm sm:text-base ${currentPage == 0 ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:text-yellow-300"} transition-colors`}
        onClick={() => setCurrentPage(0)}
        aria-label="First page"
      >
        <i className="fa-solid fa-angles-left"></i>
      </button>
      <button
        className={`border border-white px-1.5 sm:px-2 rounded-md text-white text-sm sm:text-base ${currentPage == 0 ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:bg-white hover:text-black"} transition-colors`}
        onClick={prevPage}
        disabled={currentPage == 0}
        aria-label="Previous page"
      >
        <i className="fa-solid fa-angle-left"></i>
      </button>
      <div className="text-white text-xs sm:text-sm md:text-base">page {currentPage + 1} of {totalPages}</div>
      <button
        className={`border border-white px-1.5 sm:px-2 rounded-md text-white text-sm sm:text-base ${currentPage == totalPages - 1 ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:bg-white hover:text-black"} transition-colors`}
        onClick={nextPage}
        disabled={currentPage == totalPages - 1}
        aria-label="Next page"
      >
        <i className="fa-solid fa-angle-right"></i>
      </button>
      <button
        className={`text-white px-1.5 sm:px-2 text-sm sm:text-base ${currentPage == totalPages - 1 ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:text-yellow-300"} transition-colors`}
        onClick={() => setCurrentPage(totalPages - 1)}
        aria-label="Last page"
      >
        <i className="fa-solid fa-angles-right"></i>
      </button>
    </div>
  );
};

export default Pagination;
