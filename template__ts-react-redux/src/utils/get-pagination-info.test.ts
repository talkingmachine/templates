import { getPaginationInfo } from './get-pagination-info';

describe('Get pagination info', () => {
  it('should return pagination info', () => {
    const tests = [
      {
        props: {currentPage: 1, listLength: 22, productsPerPage: 9, pagesPerRow: 3},
        expected: {nextButton: false, prevButton: false, pageNumbers: [1, 2, 3] }
      },
      {
        props: {currentPage: 3, listLength: 40, productsPerPage: 9, pagesPerRow: 3},
        expected: {nextButton: true, prevButton: false, pageNumbers: [1, 2, 3] }
      },
      {
        props: {currentPage: 5, listLength: 40, productsPerPage: 9, pagesPerRow: 3},
        expected: {nextButton: false, prevButton: true, pageNumbers: [4, 5] }
      },
      {
        props: {currentPage: 2, listLength: 3, productsPerPage: 3, pagesPerRow: 2},
        expected: false
      },
      {
        props: {currentPage: 4, listLength: 62, productsPerPage: 3, pagesPerRow: 3},
        expected: {nextButton: true, prevButton: true, pageNumbers: [4, 5, 6] }
      },
    ];
    tests.forEach((test) => {
      expect(test.expected).toEqual(getPaginationInfo(
        test.props.currentPage,
        test.props.listLength,
        test.props.productsPerPage,
        test.props.pagesPerRow
      ));
    });
  });
});
