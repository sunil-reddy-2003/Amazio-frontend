const Pagination = (props) => {
  const { currentPage, setCurrentPage, totalPages } = props;

  const prevPage = () => {
    setCurrentPage((prev) => prev-1);
  };
  const nextPage = () => {
    setCurrentPage((prev) => prev+1);
  };

  if (totalPages == null || totalPages <= 0) return null;

  return (
    <nav
      aria-label="Product pagination"
      className="mt-auto flex w-full shrink-0 flex-wrap items-center justify-center gap-1.5 border-y border-white/20 bg-gray-950 px-2 py-3 sm:gap-4 sm:px-4"
    >
      <button
        className={`min-h-10 min-w-10 rounded-md text-white transition-colors ${currentPage == 0 ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:text-yellow-300"}`}
        onClick={() => setCurrentPage(0)}
        disabled={currentPage == 0}
        aria-label="First page"
      >
        <i className="fa-solid fa-angles-left"></i>
      </button>
      <button
        className={`min-h-10 min-w-10 rounded-md border border-white text-white transition-colors ${currentPage == 0 ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:bg-white hover:text-black"}`}
        onClick={prevPage}
        disabled={currentPage == 0}
        aria-label="Previous page"
      >
        <i className="fa-solid fa-angle-left"></i>
      </button>
      <div className="whitespace-nowrap px-1 text-center text-xs text-white sm:px-2 sm:text-sm md:text-base" aria-live="polite">
        Page {currentPage + 1} of {totalPages}
      </div>
      <button
        className={`min-h-10 min-w-10 rounded-md border border-white text-white transition-colors ${currentPage == totalPages - 1 ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:bg-white hover:text-black"}`}
        onClick={nextPage}
        disabled={currentPage == totalPages - 1}
        aria-label="Next page"
      >
        <i className="fa-solid fa-angle-right"></i>
      </button>
      <button
        className={`min-h-10 min-w-10 rounded-md text-white transition-colors ${currentPage == totalPages - 1 ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:text-yellow-300"}`}
        onClick={() => setCurrentPage(totalPages - 1)}
        disabled={currentPage == totalPages - 1}
        aria-label="Last page"
      >
        <i className="fa-solid fa-angles-right"></i>
      </button>
    </nav>
  );
};

export default Pagination;
