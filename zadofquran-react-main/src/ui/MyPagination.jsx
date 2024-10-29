import { Pagination } from "@mui/material";
import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";

const MyPagination = ({ count, dataLength, pagePerView }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const page = searchParams.get("page");
    const [currentPage, setCurrentPage] = useState(page || 1);

    React.useEffect(() => {
        if (page) {
            setCurrentPage(parseInt(page));
        }
    }, [currentPage, page]);

    const handleChange = function (event, page) {
        event.preventDefault();
        searchParams.set("page", page);
        setSearchParams(searchParams);
    };
    return (
        <Pagination
            count={Math.ceil(dataLength / pagePerView)}
            siblingCount={0}
            page={currentPage}
            onChange={(e, page) => {
                e.preventDefault(); // Prevents the default behavior of the button
                e.stopPropagation();
                handleChange(e, page);
                setCurrentPage(page);
            }}
            sx={{
                direction: "ltr",
                ".MuiButtonBase-root.Mui-selected": {
                    background: "var(--color-brand-600)",
                    color: "var(--color-grey-0)",
                },
                ".MuiPaginationItem-root.Mui-selected:hover": {
                    background: "var(--color-brand-800)",
                    color: "var(--color-grey-0)",
                },

                ".MuiButtonBase-root": {
                    fontSize: "1.6rem",
                },
                ".MuiButtonBase-root:hover": {
                    fontSize: "1.6rem",
                    background: "var(--color-brand-600)",
                    color: "var(--color-grey-0)",
                },
                ".MuiButtonBase-root svg": {
                    fontSize: "3rem",
                },
            }}
        />
    );
};

export default MyPagination;
