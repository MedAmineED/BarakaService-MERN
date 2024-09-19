import React, { ChangeEvent, useEffect, useState, useCallback, useRef } from 'react';
import { FetchType } from '../../util/types';
import "./style.css";

interface PaginationComponentProps {
    onPageChange: (start: number, rowCpt: number) => Promise<FetchType>;
}

const Pagination: React.FC<PaginationComponentProps> = ({ onPageChange }) => {
    const [pagination, setPagination] = useState({
        start: 0,
        rowCpt: 50,
        totalCount: 0,
        pageCount: 0,
        currentPage : 1,
    });

    const prevPaginationRef = useRef(pagination);




    const handleRowCountChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const newRowCpt = parseInt(e.target.value, 10);
        setPagination((prevPagination) => ({
            ...prevPagination,
            rowCpt: newRowCpt,
            start: 0, // Reset to the first page when changing row count
        }));
    };

    const handleChangePage = (page: number) => {
        setPagination((prevPagination) => ({
            ...prevPagination,
            start: (page - 1) * prevPagination.rowCpt,
            currentPage : page,
        }));
    };



    
    const fetchData = useCallback(async () => {
        try {
            const pag = await onPageChange(pagination.start, pagination.rowCpt);
            setPagination((prevPagination) => ({
                ...prevPagination,
                totalCount: pag.totalCount,
                pageCount: Math.ceil(pag.totalCount / prevPagination.rowCpt),
            }));
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    }, [pagination.start, pagination.rowCpt, onPageChange]);



    useEffect(() => {
        const prevPagination = prevPaginationRef.current;
        if (pagination.start !== prevPagination.start || pagination.rowCpt !== prevPagination.rowCpt) {
            fetchData();
            prevPaginationRef.current = pagination; // Update the ref to the new pagination state
        }
    }, [pagination.start, pagination.rowCpt, fetchData]);



    useEffect(()=> {
        fetchData();
    }, [])
    return (
        <>
            <div className="col pagination">
                <select
                    onChange={handleRowCountChange}
                    value={pagination.rowCpt}
                    className="form-select"
                    aria-label="Select number of rows"
                >
                    <option value={1}>1</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={75}>75</option>
                    <option value={100}>100</option>
                    <option value={200}>200</option>
                </select>
            </div>
            <nav className="nav-pagination" aria-label="Pagination">
                <ul className="pagination">
                    <li className="page-item">
                        <button
                            type="button"
                            className="btn btn-light"
                            onClick={() => handleChangePage(pagination.currentPage - 1)}
                            disabled={pagination.start === 0}
                        >
                            Prev
                        </button>
                    </li>
                    {Array.from({ length: pagination.pageCount }, (_, index) => {
                        const page = index + 1;
                        return (
                            <li key={page} className="page-item pagin">
                                <button
                                    type="button"
                                    className={pagination.currentPage == page? "btn btn-primary":"btn btn-light"}
                                    onClick={() => handleChangePage(page)}
                                >
                                    {page}
                                </button>
                            </li>
                        );
                    })}
                    <li className="page-item">
                        <button
                            type="button"
                            className="btn btn-light"
                            onClick={() => handleChangePage(pagination.currentPage + 1)}
                            disabled={pagination.start + pagination.rowCpt >= pagination.totalCount}
                        >
                            Next
                        </button>
                    </li>
                </ul>
            </nav>
        </>
    );
};

export default Pagination;
