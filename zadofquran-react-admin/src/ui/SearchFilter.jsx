import { useState } from "react";
import MyInput from "./form/MyInput";
import { useSearchParams } from "react-router-dom";
import Button from "./Button";
import styled from "styled-components";

const StyleForm = styled.form`
    display: flex;
    gap: 3rem;
`;
const SearchFilter = () => {
    const [search, setSearch] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (search) {
            searchParams.set("q", search);
        } else {
            searchParams.set("q", "");
        }
        setSearchParams(searchParams);
    };
    return (
        <StyleForm onSubmit={(e) => handleSubmit(e)}>
            <MyInput getValue={setSearch} label="بحث" id="teacherSearch" />
            <Button
                variation="secondary"
                style={{ minWidth: "fit-content" }}
                type="submit"
            >
                ابحث
            </Button>
        </StyleForm>
    );
};

export default SearchFilter;
