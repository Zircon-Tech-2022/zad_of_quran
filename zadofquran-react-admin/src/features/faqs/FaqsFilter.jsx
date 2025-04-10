import React from "react";
import SearchFilter from "../../ui/SearchFilter";
import FilterLayout from "../../ui/FilterLayout";
import { Grid } from "@mui/material";

import AddFaqModal from "./AddFaqModal";

const FaqsFilter = () => {
    return (
        <FilterLayout title="الاسئلة الشائعة">
            {/* <Filters
                filterField="courses"
                label="الجزئية الدراسية"
                options={[
                    { value: "all", title: "All" },
                    { value: "no-discount", title: "No discount" },
                    { value: "with-discount", title: "With discount" },
                ]}
            /> */}
            <Grid container justifyContent={"space-between"} spacing="3rem">
                <Grid item xl={3.5} lg={5} md={6} xs={12}>
                    <SearchFilter />
                </Grid>
                <Grid item>
                    <AddFaqModal />
                </Grid>
            </Grid>
        </FilterLayout>
    );
};

export default FaqsFilter;
