
export const getPaginationInfo = (currentPage: number, listLength: number, productsPerPage: number, pagesPerRow: number) => {
  const pages = Math.ceil(listLength / productsPerPage);

  if (listLength <= productsPerPage) {
    return false;
  }

  const pageNumbers = [];
  const pagesStackSupremum = pagesPerRow * Math.ceil(currentPage / pagesPerRow);
  for (let i = pagesPerRow - 1; i >= 0; i--) {
    if (pagesStackSupremum - i <= pages) {
      pageNumbers.push(pagesStackSupremum - i);
    }
  }

  return ({
    nextButton: pageNumbers[pageNumbers.length - 1] < pages,
    prevButton: pageNumbers[0] !== 1,
    pageNumbers: pageNumbers
  });
};

