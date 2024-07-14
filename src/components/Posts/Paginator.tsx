import React, {useMemo} from 'react';
import {usePaginatedPosts} from "@/components/Posts/PostsContext";

const Pagination: React.FC = () => {
    const { page, setPage, isLoading, paginatedPosts: {pagination: {totalPages, currentPage, totalCount}} } = usePaginatedPosts();

    const startPage = useMemo(() => Math.max(1, page), [page]);
    const endPage = useMemo(() => Math.min(totalPages, startPage), [totalPages, startPage]);
    const pageNumbers = useMemo(() => {
        const pageNumbers = [];
        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }
        return pageNumbers;
    }, [startPage, endPage]);

    if(totalPages === 1) return null;

    if(!isLoading && !totalCount) return null

    return (
        <div className="flex justify-center mt-4">
            <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1 || isLoading}
                className="px-4 py-2 mr-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            >
                Previous
            </button>
            {pageNumbers.map((pageNumber) => (
                <button
                    key={pageNumber}
                    disabled={isLoading}
                    onClick={() => setPage(pageNumber)}
                    className={`px-4 py-2 rounded ${
                        pageNumber === page
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 hover:bg-gray-300'
                    } ${currentPage === pageNumber ?? 'bg-red-300'}`}
                >
                    {pageNumber}
                </button>
            ))}
            <button
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages || isLoading}
                className="px-4 py-2 ml-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
