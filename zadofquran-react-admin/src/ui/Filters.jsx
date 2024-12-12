import React from "react";
import { useSearchParams } from "react-router-dom";
import FilterSelect from "./form/FilterSelect";

const Filters = ({ filterField, options, label }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const currentFilter = searchParams.get(filterField) || options.at(0).value;
    function handleClick(filterName, value) {
        searchParams.set(filterField, value.value || "all");
        if (searchParams.get("page")) searchParams.set("page", 1);

        setSearchParams(searchParams);
    }
    // get default value
    const { title } = options.find((element) => {
        return element.value === currentFilter;
    });
    return (
        <FilterSelect
            label={label}
            id={filterField}
            setFormValue={handleClick}
            defaultValue={title}
            name={filterField}
            myOptions={[
                { value: "all", title: "All" },
                { value: "no-discount", title: "No discount" },
                { value: "with-discount", title: "With discount" },
            ]}
        />
    );
};

export default Filters;
