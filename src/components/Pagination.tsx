import React, { useState, useEffect } from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const [gotoPageNumber, setGotoPageNumber] = useState<number>(currentPage);

    useEffect(() => {
        setGotoPageNumber(currentPage);
    }, [currentPage]);

    const handleGotoPage = () => {
        if (gotoPageNumber >= 1 && gotoPageNumber <= totalPages) {
            onPageChange(gotoPageNumber);
        }
    };

    return (
        <div className="pagination-container">
            <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className="pagination-button">
                Предыдущая
            </button>

            <input
                type="number"
                value={gotoPageNumber}
                onChange={(e) => setGotoPageNumber(Number(e.target.value))}
                min="1"
                max={totalPages}
                className="page-input"
            />
            <button onClick={handleGotoPage} className="goto-button">
                Перейти
            </button>

            <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} className="pagination-button">
                Следующая
            </button>
        </div>
    );
};

export default Pagination;
