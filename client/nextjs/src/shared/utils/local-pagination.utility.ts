type LocalPaginationUtilityProps = {
  itemsPerPage: number;
  currentPage: number;
  items: any[];
};

export function localPaginationUtility({ currentPage, itemsPerPage, items }: LocalPaginationUtilityProps) {
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(items.length / itemsPerPage);

  return { currentItems, totalPages, itemsPerPage };
}
