import { ChevronLeft, ChevronRight, GraduationCap } from 'lucide-react';
import ReactPaginate from 'react-paginate';

export default function Pagination({ getPage, pageCount=20 }) {
  
  const handlePageClick = (data) => {
    getPage(data.selected + 1);
  };

  return (
    <div>
      <ReactPaginate
        breakLabel="..."
        nextLabel={<ChevronRight className="w-4 h-4" />}
        previousLabel={<ChevronLeft className="w-4 h-4" />}
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        renderOnZeroPageCount={null}
        activeClassName="bg-primary text-white"
        className="flex gap-2"
        pageClassName="h-10 w-10 flex items-center justify-center rounded-lg border border-gray-300 hover:bg-gray-100"
        pageLinkClassName="font-medium"
        previousClassName="bg-primary text-white h-10 w-10 flex items-center justify-center rounded-lg border border-gray-300"
        nextClassName="bg-primary text-white h-10 w-10 flex items-center justify-center rounded-lg border border-gray-300"
      />
    </div>
  );
}
